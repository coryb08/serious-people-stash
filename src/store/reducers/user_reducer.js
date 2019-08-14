import {
  SET_USER_WITH_ONLY_AUTH_RES,
  IS_LOGGED_IN,
  UPDATE_CURRENT_USER,
  SIGN_OUT,
  SET_EXISTING_USER_WITH_REALTIME_RESPONSE
} from "../types.js";
import { Actions } from "react-native-router-flux";
import * as actions from "../actions/index";
let defaultUser = {
  status: "no user",
  gender: "",
  firstName: "",
  interestedIn: "",
  timePosted: "",
  blurb: "",
  facebook: "",
  location: {
    city: "",
    state: "",
    postcode: "",
    coordinates: {
      latitude: "",
      longitude: ""
    },
    timezone: {
      offset: ""
    }
  },

  login: {
    _lat: "",
    refreshToken: "",
    uid: "",
    displayName: null,
    photoURL: null,
    email: "",
    emailVerified: false,
    phoneNumber: null,
    isAnonymous: false,
    metadata: {
      a: "",
      b: "",
      lastSignInTime: "",
      creationTime: ""
    },
    providerData: [
      {
        uid: "",
        displayName: null,
        photoURL: null,
        email: "",
        phoneNumber: null,
        providerId: ""
      }
    ]
  },
  dob: {
    date: "",
    age: ""
  },
  registered: {
    date: ""
  },
  id: {
    name: "",
    value: ""
  },
  pictures: { "0": "", "1": "", "2": "", "3": "", "4": "" },
  nat: "",
  conversations: []
};
export default function userReducer(state = defaultUser, action) {
  switch (action.type) {
    case SET_USER_WITH_ONLY_AUTH_RES:
      if (!action.payload.email) {
        console.log("no email credential");
        return defaultUser;
      } else {
        let login = {};

        let keyArray = Object.keys(action.payload);

        keyArray.map(ele => {
          if (ele.toString().length > 2) {
            login[ele] = action.payload[ele];
          }
        });
        let updatedUserState = {
          ...defaultUser,
          facebook: action.payload.facebook,
          login: { ...login },
          status: "good"
        };
        return updatedUserState;
      }
    case SIGN_OUT:
      return defaultUser;
    case SET_EXISTING_USER_WITH_REALTIME_RESPONSE:
      let updatedUserState = {
        ...action.payload.realtimeResponse,

        login: { ...action.payload.existingUser.login }
      };
      return updatedUserState;
    default:
      return defaultUser;
  }
}

// let defaultUser = {
//   gender: "male",
//   name: {
//     title: "mr",
//     first: "marion",
//     last: "dunn"
//   },
//   timePosted: "5 mins ago",
//   blurb: "me: yeah *whispers* i don’t have any money",
//   location: {
//     city: "New York City",
//     state: "New York",
//     postcode: "10012",
//     coordinates: {
//       latitude: "40.7128",
//       longitude: "74.0060"
//     },
//     timezone: {
//       offset: "-5:00"
//     }
//   },
//   facebook: {},
//   login: {
//     uid: "HmX5zbDWbZdaDWsiaV4tdqkdT2j1",
//     displayName: null,
//     photoURL: null,
//     email: "sampleuser2@mail.com",
//     emailVerified: false,
//     phoneNumber: null,
//     isAnonymous: false,
//     providerData: [
//       {
//         uid: "sampleuser2@mail.com",
//         displayName: null,
//         photoURL: null,
//         email: "sampleuser2@mail.com",
//         phoneNumber: null,
//         providerId: "password"
//       }
//     ],
//     apiKey: "AIzaSyBbrNBeeizjuIsNZkFhoRLS3UagkZfaujk",
//     appName: "[DEFAULT]",
//     authDomain: "seriouspeople-1cb8b.firebaseapp.com",
//     stsTokenManager: {
//       apiKey: "AIzaSyBbrNBeeizjuIsNZkFhoRLS3UagkZfaujk",
//       refreshToken:
//         "AGK09AMaC8Xippu3TwHqD5qWliQmB6nmfDy26Md9tFIZOeZObEKcwmP-6DSEoZxpjMRe6K8TWEgVHPO1WABkKCYHyNBjZl-uCod2dnnWE52w5HEgYZrOThei1xFFtuUUwozDeG1kq1IvZqmYr-mV-7VvaMh_3eJjuGkupXshnklXUuzVDkTzBCE4EJVhaPhVERG6rf2mtgj99jbIGb_YCzc2ISaejdcFg-YOTgLWwWYerH64Fmm4kjU",
//       accessToken:
//         "eyJhbGciOiJSUzI1NiIsImtpZCI6IjMxYTI2OGZjOTAyYmY5NjA5YzFmMzA5YmMyOTJmMmYxOGVhNjc3MzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2VyaW91c3Blb3BsZS0xY2I4YiIsImF1ZCI6InNlcmlvdXNwZW9wbGUtMWNiOGIiLCJhdXRoX3RpbWUiOjE1NDY5OTc2MTAsInVzZXJfaWQiOiJIbVg1emJEV2JaZGFEV3NpYVY0dGRxa2RUMmoxIiwic3ViIjoiSG1YNXpiRFdiWmRhRFdzaWFWNHRkcWtkVDJqMSIsImlhdCI6MTU0Njk5NzYxMCwiZXhwIjoxNTQ3MDAxMjEwLCJlbWFpbCI6InNhbXBsZXVzZXIyQG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNhbXBsZXVzZXIyQG1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.btDhKtgWI3AUMvQYwnz2c1deUS0kcCIzHYoi_IYDnovHARqh2dlfK3JtbRrVsv6iWssqRv1Mucnk508GEb1GStzhFleP5pmiWT0eQYDa3Skz6pg681wdsiNvykxPNcHEL28wjS6qP2GD8X9nuAkP8x99MYJ7hXCsNEhBOUC6VNvvzjg2hmusVeBcDJ-lnLDgtZHr73au-O6wOlPTAcTp3Y_dfYUaZtCBS7sQmtMCqc_K2dl_Yn0fAHpYbxecI1j_Y6yTrGpgtDE9cr9GglC5lgjE1tD-EtcTKhL9318UjCZImwkvlAGXfq5HsC5zzA2S4CkJ-dd9uCRTPk4Irmpzvg",
//       expirationTime: 1547001321747
//     },
//     redirectEventId: null,
//     lastLoginAt: "1546997610000",
//     createdAt: "1546997610000",
//     isNewUser: true
//   },
//   dob: {
//     date: "1949-05-09T03:45:39Z",
//     age: 69
//   },
//   registered: {
//     date: "2009-12-04T22:54:06Z",
//     age: 9
//   },
//   phone: "01980 24884",
//   cell: "0744-190-211",
//   id: {
//     name: "NINO",
//     value: "HT 31 80 19 H"
//   },
//   picture: {
//     large: "https://randomuser.me/api/portraits/men/48.jpg",
//     medium: "https://randomuser.me/api/portraits/med/men/48.jpg",
//     thumbnail: "https://randomuser.me/api/portraits/thumb/men/48.jpg"
//   },
//   nat: "GB"
// };
