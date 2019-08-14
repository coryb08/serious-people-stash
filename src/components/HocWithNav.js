import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView
} from "react-native";
import Nav from "./Nav";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function HocWithNav(WrappedComponent) {
  return class extends React.Component {
    render() {
      return [
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          style={{ backgroundColor: "#c0ded9" }}
          contentContainerStyle={styles.container}
        >
          <WrappedComponent
            height="100%"
            key="wrappedComponent"
            {...this.props}
          />
        </KeyboardAwareScrollView>,
        <Nav height="7%" />
      ];
    }
  };
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    flexDirection: "column"
  },
  signupImg: {
    height: 35,
    width: 35
  }
});
