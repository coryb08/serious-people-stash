// import * as actions from "./actions";
// import rootReducer from "./reducers/index";
// import userReducer from "./reducers/user_reducer.js";
// // import configureMockStore from "redux-mock-store";
// // import { EmailSignUpRunner } from "./actions";
// import { Reducer, Thunk } from "redux-testkit";
// import { createStore, applyMiddleware } from "redux";
// let store = createStore(rootReducer);
// // const resKeys = ["user", "credential", "additionalUserInfo", "operationType"];
// const randomNum = Math.floor(Math.random() * 100000);
// const testUser = {
//   emailText: `reduxTest${randomNum}@tests.com`,
//   passwordText: "Testing123",
//   passwordConfirmText: "Testing123"
// };
// describe("User reducer", () => {
//   it("should have initial state", () => {
//     expect(store.getState().user).toEqual({});
//   });

//   it("invalid 'type' should not affect state", () => {
//     Reducer(userReducer)
//       .expect({ type: "NOT_EXISTING" })
//       .toReturnState({});
//   });

//   it("should store new users", async () => {
//     const dispatches = actions.setCurrentUser(testUser);
//     Reducer(userReducer)
//       .expect({ type: "SET_CURRENT_USER", payload: testUser })
//       .toReturnState(testUser);
//   });
// });

// describe("User actions", () => {
//   it("emailSignUpRunner returns a function", async () => {
//     expect(typeof actions.EmailSignUpRunner(testUser)).toEqual("function");
//   });
//   it("setCurrentUser returns an object", async () => {
//     expect(typeof actions.setCurrentUser(testUser)).toEqual("object");
//   });
// });
