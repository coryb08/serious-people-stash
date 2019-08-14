import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const transparent = "transparent";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c0ded9",
    height: "100%",
    width: "100%",
    flexDirection: "column"
  },
  backArrow: {
    fontFamily: "AmaticSC-Bold",
    color: "#3b3a30",
    fontSize: 45,
    letterSpacing: -5
  },
  backArrowContainer: {
    position: "absolute",

    top: 0,
    left: 0,
    height: 75,
    marginLeft: "3%",
    marginTop: "2%",
    borderColor: "#3b3a30",
    zIndex: 4
  }
});

export default function HocWithoutNav(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          style={{ backgroundColor: "#c0ded9", height: "100%" }}
          contentContainerStyle={styles.container}
        >
          {!this.props.hideBackImage ? (
            <TouchableOpacity
              style={styles.backArrowContainer}
              onPress={Actions.pop}
            >
              <Text style={styles.backArrow}>{" <- "}</Text>
            </TouchableOpacity>
          ) : null}
          <WrappedComponent key="wrappedComponent2" {...this.props} />
        </KeyboardAwareScrollView>
      );
    }
  };
}
