import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverID: this.props.messaging.receiverID,
      message: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: "65%", width: "90%", marginTop: "5%" }}>
          <ScrollView
            contentContainerStyle={{ paddingVertical: 15 }}
            style={styles.scrollview}
            ref={ref => (this.scrollView = ref)}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: true });
            }}
          >
            {this.props.messaging.messages.length ? (
              this.props.messaging.messages.map(ele => (
                <Text
                  style={
                    ele.senderID === this.props.user.login.uid
                      ? styles.myText
                      : styles.theirText
                  }
                >
                  {ele.message}
                </Text>
              ))
            ) : (
              <Text />
            )}
          </ScrollView>
        </View>
        <View style={{ height: "15%", width: "90%" }}>
          <TextInput
            value={this.state.message}
            onChangeText={text => this.setState({ message: text })}
            style={styles.input}
            multiline={true}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.sendMessage({
              receiverID: this.state.receiverID,
              convID: this.props.messaging.conversationID,
              message: this.state.message
            });
            this.setState({ message: "" });
          }}
          style={{ borderColor: "gray", borderWidth: 1, padding: 10 }}
        >
          <Text>SEND</Text>
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
)(Chat);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    height: "100%",
    width: "100%"
  },
  myText: {
    width: "80%",
    alignSelf: "flex-end",
    marginVertical: 10,
    backgroundColor: "skyblue",
    fontSize: 20,
    fontFamily: "JosefinSans-Regular",
    color: "#3b3a30"
  },
  theirText: {
    width: "80%",
    marginVertical: 10,
    backgroundColor: "lightgray",
    fontSize: 20,
    fontFamily: "JosefinSans-Regular",
    color: "#3b3a30"
  },
  input: {
    width: "100%",
    textAlignVertical: "top",
    height: "100%",
    backgroundColor: "#eaece5"
  },
  scrollview: {
    width: "100%",
    height: "100%",
    padding: 10,

    backgroundColor: "#eaece5"
  }
});
