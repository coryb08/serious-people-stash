const defaultState = {
  receiverID: "",
  message: "",
  coversationID: "",
  conversations: [],
  messages: []
};
export default function(state = defaultState, action) {
  switch (action.type) {
    case "SET_RECEIVER":
      return {
        ...state,
        receiverID: action.payload,
        message: "",
        coversationID: "",
        messages: []
      };
    case "RESET_MESSAGING":
      return {
        ...state,
        receiverID: "",
        message: "",
        coversationID: "",
        messages: []
      };
    case "SET_CONVERSATIONS":
      return {
        ...state,
        conversations: action.payload
      };
    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.payload.messages,
        conversationID: action.payload.conversationID
        //need to push.. account for existing messages, will prob happen in actions
      };
    default:
      return state;
  }
}

// user = {
//   uid: 557,
//   conversations: ["uid982"]
// };

// conversations = {
//   uid982: {
//     users: {
//       "1": 557,
//       "2": 754
//     },
//     lastMessage: "last message",
//     created_at: 154029388,
//     updated_at: 17495096
//   }
// };

// messages = {
//   uid661: {
//     userID: "",
//     conversationID: "",
//     message: ""
//   }
// };
