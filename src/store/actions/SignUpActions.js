import { Actions } from "react-native-router-flux";
import config from "../../config.js";
import * as actions from "./index";
import { Alert } from "react-native";
import axios from "axios";
import thunk from "redux-thunk";
import firebase from "../../api/firebase";
// const firebase2 = require("firebase");
// // Required for side-effects
require("firebase/firestore");
import {
  SET_USER_WITH_ONLY_AUTH_RES,
  IS_LOGGED_IN,
  UPDATE_CURRENT_USER,
  SET_EXISTING_USER_WITH_REALTIME_RESPONSE
} from "../types.js";
const { SERVER_URL } = config;
const randomNum = Math.floor(Math.random() * 100000);
const testUser = {
  emailText: `reduxTest${randomNum}@tests.com`,
  passwordText: "Testing123",
  passwordConfirmText: "Testing123"
};

export const EmailSignUpRunner = inputs => {
  return async (dispatch, getState) => {
    // if (inputs.emailText === "") {
    //   inputs = testUser;
    // }
    let validation = frontEndValidation(inputs);

    if (validation) {
      let email = inputs.emailText;
      let password = inputs.passwordText;
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .catch(function(error) {
            if (error) {
              console.log("sign up error", error);
            }
            // ...
          })
          .then(res => {
            // auth().createWithEmailAndPassword is nest, be sure to call res.user
            return dispatch({
              type: SET_USER_WITH_ONLY_AUTH_RES,
              payload: { ...res.user, facebook: false }
            });
          })
          .then(res => dispatch(actions.postToRealtime()));
      } catch (error) {
        console.log("sign up", error);
      }
    } else {
      return;
    }
  };
};

export const postToRealtime = passedState => {
  return async (dispatch, getState) => {
    let user = await getState().user;
    let id = user.login.uid;
    let obj = {
      ...user,
      login: {
        ...user.login,
        refreshToken: "none",
        metadata: {
          a: user.login.metadata.a,
          b: user.login.metadata.b,
          lastSignInTime: user.login.metadata.lastSignInTime,
          creationTime: user.login.metadata.creationTime
        },
        providerData: "none"
      }
    };
    try {
      await firebase
        .firestore()
        .collection(`userProfiles`)
        .doc(id)
        .set(obj)
        .catch(err => console.log("error", err))
        .then(res => {
          Actions.ProfileSetup();
        });
    } catch (err) {
      console.log("postToRealtime", err);
    }
  };
};

const frontEndValidation = inputs => {
  if (inputs.passwordText !== inputs.passwordConfirmText) {
    Alert.alert(
      "Passwords do not match",
      "",
      [{ text: "OK", onPress: () => {} }],
      { cancelable: false }
    );
    return false;
  }
  if (
    inputs.passwordText === "" ||
    inputs.passwordConfirmText === "" ||
    inputs.emailText === ""
  ) {
    Alert.alert(
      "Please fill in all fields",
      "",
      [{ text: "OK", onPress: () => {} }],
      { cancelable: false }
    );

    return false;
  } else {
    return true;
  }
};
