import { Actions, ActionConst } from "react-native-router-flux";
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
import axios from "axios";
import firebase from "../../api/firebase";
require("firebase/firestore");

import {
  LoginManager,
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";

export const setCurrentUser = firebaseRes => {
  return async (dispatch, getState) => {
    await dispatch({
      type: SET_USER_WITH_ONLY_AUTH_RES,
      payload: firebaseRes
    });
  };
};

const uploadPhoto = async (string64, userId, position = 0) => {
  const date = Date.now();
  let imageLink;
  try {
    await firebase
      .storage()
      .ref()
      .child(`userImages/${userId}/photo-${position}.JPG`)
      .putString(string64, "base64")
      .catch(err => console.log("upload error", err))
      .then(function(snapshot) {});
  } catch (error) {
    console.log("upload error", error);
  }
  try {
    await firebase
      .storage()
      .ref()
      .child(`userImages/${userId}/photo-${position}.JPG`)
      .getDownloadURL()
      .then(function(url) {
        imageLink = url;
      })
      .catch(function(error) {
        console.log("img error", error);
      });
  } catch (error) {
    console.log("download url error", error);
  }

  return imageLink;
};

export const addOrReplacePhoto = (base64, position = 0) => {
  return async (dispatch, getState) => {
    let user = await getState().user;
    let id = user.login.uid;
    let uploader = await uploadPhoto(base64, id, position);
    let newPicObj = user.pictures;

    newPicObj[position] = uploader;
    console.log("id", id);
    try {
      let ref = await firebase
        .firestore()
        .collection(`userProfiles`)
        .doc(id);
      ref
        .update({
          pictures: newPicObj
        })
        .catch(err => console.log("error", err));

      ref.onSnapshot(snapshot => {
        let updatedInfo = snapshot.data();
        return dispatch({
          type: SET_EXISTING_USER_WITH_REALTIME_RESPONSE,
          payload: { realtimeResponse: updatedInfo, existingUser: user }
        });
      });
    } catch (err) {
      console.log("addOrReplacePhoto error", err);
    }
  };
};

export const updateRealtime = passedState => {
  return async (dispatch, getState) => {
    let user = await getState().user;
    let newPicArray;

    try {
      let ref = await firebase
        .firestore()
        .collection(`userProfiles`)
        .doc(user.login.uid);

      ref
        .update({
          firstName: passedState.firstName,
          gender: passedState.gender,
          interestedIn: passedState.interestedIn,
          // pictures: newPicArray,
          location: { city: passedState.city }
        })
        .catch(err => console.log("error", err));

      ref.onSnapshot(snapshot => {
        let updatedInfo = {
          ...snapshot.data()
          // pictures: Object.values(snapshot.val().pictures)
        };
        dispatch({
          type: SET_EXISTING_USER_WITH_REALTIME_RESPONSE,
          payload: { realtimeResponse: updatedInfo, existingUser: user }
        });
        Actions.UserFeed();
      });
    } catch (err) {
      console.log("setUserProfile", err);
    }
  };
};

export const retrieveRealtime = id => {
  return async (dispatch, getState) => {
    let user = await getState().user;
    try {
      await firebase
        .firestore()
        .collection(`userProfiles`)
        .doc(id)
        .get()

        .catch(err => console.log("retrieveRealtime error", err))
        .then(res => {
          let value = res.data();
          return dispatch({
            type: SET_EXISTING_USER_WITH_REALTIME_RESPONSE,
            payload: { realtimeResponse: value, existingUser: user }
          });
          // dispatch({
          //   type: "APP_LOADING",
          //   payload: false
          // });
        });
    } catch (err) {
      console.log("setUserProfile", err);
    }
  };
};

export const currentUser = () => {
  return async (dispatch, getState) => {
    try {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          dispatch({
            type: SET_USER_WITH_ONLY_AUTH_RES,
            payload: user
          });
          dispatch(actions.appLoading(false));
          console.log("user is logged in");
          return dispatch(actions.retrieveRealtime(user.uid));
        } else {
          console.log("user is not logged in");
          return dispatch(actions.appLoading(false));
        }
      });
      // auth().currentUser is not nested- do not call user.user
    } catch (err) {
      console.log("current user", err);
    }
  };
};

export const signOut = () => {
  return async (dispatch, getState) => {
    if (await getState().user.facebook) {
      LoginManager.logOut();
    }
    try {
      await firebase
        .auth()
        .signOut()
        .catch(err => console.log("sign out error", err))
        .then(res => {
          Actions.SignInUp();
          return dispatch({ type: SIGN_OUT, payload: {} });
        });
    } catch (err) {
      console.log("sign out error", err);
    }
  };
};

export const appLoading = bool => {
  return { type: "APP_LOADING", payload: bool };
};
