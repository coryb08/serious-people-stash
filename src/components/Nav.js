import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image
} from "react-native";
import * as actions from "../store/actions";

import { connect } from "react-redux";
import asana from "../../assets/Good-Stuff-No-Nonsense-Social-Icons/PNG/128x128px/asana.png";
import chat from "../../assets/Good-Stuff-No-Nonsense-Social-Icons/PNG/128x128px/chat.png";
import odnoklassniki from "../../assets/Good-Stuff-No-Nonsense-Social-Icons/PNG/128x128px/odnoklassniki.png";
import { Actions, ActionConst } from "react-native-router-flux";

const transparent = "transparent";
class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const styles = StyleSheet.create({
      leftRightIcon: {
        height: 30,
        width: 30
      },
      feedIcon: {
        height: 40,
        width: 40
      },
      container: {
        backgroundColor: "lightgray",
        borderTopColor: "darkgray",
        borderTopWidth: 1,
        height: this.props.height,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "4%",
        paddingRight: "4%",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11
      }
    });
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            if (Actions.currentScene === "MessageFeed") {
              return;
            } else {
              this.props.resetMessaging();
              this.props.retrieveConversations(this.props.user.login.uid);
              Actions.MessageFeed({ type: ActionConst.REPLACE });
            }
          }}
        >
          <Image style={styles.leftRightIcon} source={chat} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (Actions.currentScene === "UserFeed") {
              return;
            } else {
              this.props.resetMessaging();
              Actions.UserFeed({ type: ActionConst.REPLACE });
            }
          }}
        >
          <Image style={styles.feedIcon} source={asana} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (Actions.currentScene === "UserProfile") {
              return;
            } else {
              this.props.resetMessaging();
              Actions.UserProfile({ type: ActionConst.REPLACE });
            }
          }}
        >
          <Image style={styles.leftRightIcon} source={odnoklassniki} />
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  actions
)(Nav);
