import { combineReducers } from "redux";
import events from "./events_reducer";
import feed from "./feed_reducer";
import user from "./user_reducer";
import messaging from "./messaging_reducer";
const rootReducer = combineReducers({ events, feed, user, messaging });

export default rootReducer;
