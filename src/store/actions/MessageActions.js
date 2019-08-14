import { Actions } from "react-native-router-flux";
import {
  SET_USER_WITH_ONLY_AUTH_RES,
  IS_LOGGED_IN,
  SIGN_OUT,
  UPDATE_CURRENT_USER,
  SET_EXISTING_USER_WITH_REALTIME_RESPONSE
} from "../types.js";
import * as actions from "./index";
import config from "../../config.js";
const { SERVER_URL } = config;
import firebase from "../../api/firebase";

export const setReceiver = receiverID => {
  return async (dispatch, getState) => {
    dispatch({ type: "SET_RECEIVER", payload: receiverID });
    // post convo or fetch messages
    let currentUserID = getState().user.login.uid;
    let convos = await getState().messaging.conversations;
    let convo = convos.filter(ele => {
      return (
        ele.users.includes(receiverID) && ele.users.includes(currentUserID)
      );
    });

    if (convo.length) {
      await dispatch(actions.retrieveMessages({ receiverID, convo: convo[0] }));
    } else {
      return;
    }
  };
};

retrieveUserPhotos = async theirID => {
  let returnObj;
  await firebase
    .firestore()
    .collection(`userProfiles`)
    .doc(theirID)
    .get()
    .then(res => {
      returnObj = res.data().pictures;
    });
  return returnObj;
};

export const retrieveConversations = currentUser => {
  return async (dispatch, getState) => {
    try {
      await firebase
        .firestore()
        .collection(`conversations`)
        .where("users", "array-contains", currentUser)
        .get()
        .then(convos => {
          if (convos.docs.length) {
            let newArr = [];
            var theirPicture;
            convos.docs.map(ele => {
              let data = ele.data();
              theirPicture = (async () =>
                await this.retrieveUserPhotos(data.users[1]))();
              newArr.push({
                ...data,
                id: ele.id,
                theirPicture: theirPicture[0]
              });
            });
            console.log("newArr", newArr);
            dispatch({ type: "SET_CONVERSATIONS", payload: newArr });
          }
        });
    } catch (err) {
      console.log("retrieveConversations", err);
    }
  };
};

export const retrieveMessages = params => {
  return async (dispatch, getState) => {
    // let convos = await getState().messaging.conversations;
    // let convo = convos.filter(ele => ele.users.includes(params.receiverID));

    await firebase
      .firestore()
      .collection(`messages`)
      .where("conversationID", "==", params.convo.id)
      .get()
      .then(messages => {
        let newArr = [];
        messages.docs.forEach(ele => newArr.push(ele.data()));
        newArr.sort((a, b) => {
          return a.created_at - b.created_at;
        });
        dispatch({
          type: "SET_MESSAGES",
          payload: { messages: newArr, conversationID: params.convo.id }
        });
      });
  };
};

export const sendMessage = params => {
  return async (dispatch, getState) => {
    let currentUser = await getState().user.login.uid;
    if (!params.convID) {
      dispatch(
        actions.postConversation(params.receiverID, params.message, currentUser)
      );
    } else {
      dispatch(actions.updateConversation({ ...params, currentUser }));
    }
  };
};

export const resetMessaging = () => {
  return async (dispatch, getState) => {
    dispatch({ type: "RESET_MESSAGING", payload: "" });
  };
};

export const updateConversation = params => {
  return async (dispatch, getState) => {
    try {
      let ref = await firebase
        .firestore()
        .collection(`conversations`)
        .doc(params.convID);
      ref
        .update({ lastMessage: params.message, updated_at: Date.now() })
        .then(res =>
          dispatch(
            actions.postMessage({
              senderID: params.currentUser,
              message: params.message,
              convID: params.convID
            })
          )
        )
        .catch(err => {
          console.log("updateConversations error", err);
        });
    } catch (err) {
      console.log("retrieveConversations", err);
    }
  };
};

export const postConversation = (receiverID, message, currentUser) => {
  return async (dispatch, getState) => {
    let obj = {
      users: [currentUser, receiverID],
      lastMessage: message,
      created_at: Date.now(),
      updated_at: Date.now()
    };
    try {
      let ref = await firebase.firestore().collection(`conversations`);
      await ref
        .add(obj)
        .catch(err => console.log("error", err))
        .then(res => {
          dispatch(
            actions.postMessage({
              senderID: currentUser,
              message: message,
              convID: res.id
            })
          );
        });
      ref.onSnapshot(snapshot => {
        let data = snapshot.valueOf().docs[0].data();
        dispatch({ type: "SET_CONVERSATIONS", payload: data });
        //need to push.. account for existing messages, will prob happen in actions
      });
    } catch (err) {
      console.log("postConversation", err);
    }
  };
};

export const postMessage = params => {
  return async (dispatch, getState) => {
    let obj = {
      senderID: params.senderID,
      message: params.message,
      conversationID: params.convID,
      created_at: Date.now()
    };
    let stateMessages = getState().messaging.messages;
    try {
      let ref = await firebase.firestore().collection(`messages`);

      await ref
        .add(obj)
        .catch(err => console.log("post messages error", err))
        .then(res => {
          let docID = res.id;
          ref.onSnapshot(snapshot => {
            let docs = snapshot.valueOf().docs;

            let data = docs.filter(ele => ele.id === docID)[0].data();

            stateMessages.push(data);
            let returnArray = Array.from(new Set(stateMessages));
            // need to fix this still... temporary
            returnArray.sort((a, b) => {
              return a.created_at - b.created_at;
            });
            dispatch({
              type: "SET_MESSAGES",
              payload: {
                messages: returnArray,
                conversationID: obj.conversationID
              }
            });
          });
        });
    } catch (err) {
      console.log("postMessage", err);
    }
  };
};
