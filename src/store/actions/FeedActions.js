import { Actions } from "react-native-router-flux";
// import config from "master_a_million/config.js"
// import validate from 'validate.js'
// const { SERVER_URL } = config
// import bugsnag from "../api/bugsnag";
// import firebase from "./../api/firebase";
import config from "../../config.js";
const { SERVER_URL } = config;
import axios from "axios";
import firebase from "../../api/firebase";
import * as actions from "./index";

export const getBlurbs = () => {
  return async (dispatch, getState) => {
    // let convos = await getState().messaging.conversations;
    // let convo = convos.filter(ele => ele.users.includes(params.receiverID));

    await firebase
      .firestore()
      .collection(`blurbs`)
      .get()
      .then(blurbs => {
        let newArr = [];
        blurbs.docs.forEach(blurb => newArr.push(blurb.data()));
        return dispatch({ type: "FETCH_BLURBS", payload: newArr });
      });
  };
};

export const createBlurb = message => {
  return async (dispatch, getState) => {
    let user = await getState().user.login.uid;
    let imgLink = await getState().user.pictures[0];
    let name = await getState().user.firstName;
    let obj = {
      name,
      user,
      blurb: message,
      userImage: imgLink,
      created_at: Date.now(),
      updated_at: Date.now()
    };
    try {
      let ref = await firebase.firestore().collection(`blurbs`);
      await ref
        .add(obj)
        .catch(err => console.log("error", err))
        .then(res => {});
      // ref.onSnapshot(snapshot => {
      //   let data = snapshot.valueOf().docs[0].data();
      //   dispatch({ type: "SET_CONVERSATIONS", payload: data });

      // });
    } catch (err) {
      console.log("postConversation", err);
    }
  };
};
