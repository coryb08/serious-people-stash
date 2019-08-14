import React from "react";
import {
  StyleSheet,
  Text,
  Animated,
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import * as actions from "../store/actions";

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), // Initial value for opacity: 0
      userProfile: false
    };
    this.props.currentUser();
  }

  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 5000 // Make it take a while
      }
    ).start();

    let initial;

    let self = this;
    setTimeout(() => {
      let user = this.props.user;
      if (
        user.status === "good" &&
        user.pictures["0"] &&
        user.firstName &&
        user.gender &&
        user.interestedIn &&
        user.location.city
      ) {
        initial = "UserFeed";
      } else if (user.status === "good") {
        initial = "ProfileSetup";
      } else {
        initial = "SignInUp";
      }
      return self.props.setInitial(initial);
    }, 2000);
  }

  componentDidUpdate() {}

  render() {
    let { fadeAnim } = this.state;
    const styles = StyleSheet.create({
      header: {
        marginTop: 100,
        fontSize: 50,
        fontFamily: "AmaticSC-Regular",
        textAlign: "center"
      }
    });
    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.header}>Splash Screen</Text>
      </Animated.View>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  actions
)(SplashScreen);
