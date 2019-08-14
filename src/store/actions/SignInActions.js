import { Actions, ActionConst } from "react-native-router-flux";
// import config from "master_a_million/config.js"
// import validate from 'validate.js'
// const { SERVER_URL } = config
// import bugsnag from "../api/bugsnag";
// import firebase from "../../api/firebase";
import config from "../../config.js";
const { SERVER_URL } = config;
import thunk from "redux-thunk";
import axios from "axios";
import { Alert } from "react-native";
import * as actions from "./index";
import firebase from "../../api/firebase";
import {
  SET_USER_WITH_ONLY_AUTH_RES,
  IS_LOGGED_IN,
  SIGN_OUT,
  UPDATE_CURRENT_USER,
  SET_EXISTING_USER_WITH_REALTIME_RESPONSE
} from "../types.js";
import firebaseApp from "firebase";
import {
  LoginManager,
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
export const signInRunner = inputs => {
  if (inputs.email === "" || inputs.password === "") {
    return { type: "" };
  } else {
    return async (dispatch, getState) => {
      let bool;
      await firebase
        .auth()
        .signInWithEmailAndPassword(inputs.email, inputs.password)
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (error) {
            console.log("error", errorMessage);
            Alert.alert(
              "",
              "User not found",
              [{ text: "OK", onPress: () => {} }],
              {
                cancelable: false
              }
            );
          }
        })

        .then(res => {
          if (res) {
            dispatch({
              type: "APP_LOADING",
              payload: true
            });
            dispatch({
              type: SET_USER_WITH_ONLY_AUTH_RES,
              payload: res.user
            });
            dispatch(actions.retrieveRealtime(res.user.uid));
          }
        });
      // .then(res => );
    };
  }
};

export const facebookLogin = () => {
  return async (dispatch, getState) => {
    LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login was cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            dispatch(sendFacebookDataToFirebaseAuth(data.accessToken));
          });
        }
      },
      function(error) {
        alert("Login failed with error: " + error);
      }
    );
  };
};

export const sendFacebookDataToFirebaseAuth = token => {
  var credential = firebaseApp.auth.FacebookAuthProvider.credential(token);
  return async (dispatch, getState) => {
    await firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
      .catch(function(error) {
        console.log("fb firebase error", error);
      })
      .then(res => {
        dispatch({
          type: SET_USER_WITH_ONLY_AUTH_RES,
          payload: { ...res.user, facebook: true }
        });
        return res;
      })
      .then(res => {
        if (res.additionalUserInfo.isNewUser) {
          dispatch(actions.postToRealtime());
        } else {
          dispatch(actions.retrieveRealtime(res.user.uid));
        }
      })
      .then(val => {
        let user = getState().user;
        console.log("inside facebook to firebase");
        if (
          (user.status =
            "good" &&
            user.pictures["0"] &&
            user.firstName &&
            user.gender &&
            user.interestedIn &&
            user.location.city)
        ) {
          Actions.UserFeed();
        } else {
          Actions.ProfileSetup();
        }
      });
  };
};
