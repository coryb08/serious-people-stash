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
import { connect } from "react-redux";
import * as actions from "../../store/actions";
class FacebookSignUp extends React.Component {
  render() {
    return <Text style={styles.header}>Not working yet</Text>;
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(
  mapStateToProps,
  actions
)(FacebookSignUp);

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    fontSize: 50,
    fontFamily: "AmaticSC-Regular",
    color: "#3b3a30"
  }
});
