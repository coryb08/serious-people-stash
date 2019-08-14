import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { Actions, ActionConst } from "react-native-router-flux";

class WriteBlurb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverID: this.props.messaging.receiverID,
      message: ""
    };
  }

  //   _scrollToInput(reactNode: any) {
  //     // Add a 'scroll' ref to your ScrollView
  //     this.scroll.props.scrollToFocusedInput(reactNode);
  //   }

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-around"
        }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
        style={styles.transparentContainer}
      >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => Actions.pop()}
            style={{ alignSelf: "flex-end", marginRight: "5%" }}
          >
            <Text
              //   onFocus={(event: Event) => {
              //     // `bind` the function if you're using ES6 classes
              //     this._scrollToInput(ReactNative.findNodeHandle(event.target));
              //   }}
              style={{
                fontSize: 40,
                fontFamily: "AmaticSC-Regular",
                color: "#3b3a30"
              }}
            >
              {` ${"X"} `}
            </Text>
          </TouchableOpacity>
          <View style={{ height: "60%", width: "90%" }}>
            <TextInput
              value={this.state.message}
              onChangeText={text => this.setState({ message: text })}
              style={styles.input}
              multiline={true}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.createBlurb(this.state.message);
              this.setState({ message: "" });
              Actions.pop();
            }}
            style={{ borderColor: "gray", borderWidth: 1, padding: 10 }}
          >
            <Text>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  actions
)(WriteBlurb);

const styles = StyleSheet.create({
  transparentContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  container: {
    position: "absolute",
    top: "25%",
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    left: "10%",
    height: "50%",
    width: "80%",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#3b3a30",
    backgroundColor: "white"
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
  }
});
