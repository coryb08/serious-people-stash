import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import RNPickerSelect from "react-native-picker-select";
import { Image } from "react-native";
import PhotoUpload from "react-native-photo-upload";
import firebase from "../../api/firebase";

// const admin = require("firebase-admin");
// var serviceAccount = require("../../seriouspeople-1cb8b-d8a83f3496dc.json");
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
class ProfileSetup extends React.Component {
  constructor(props) {
    super(props);
    this.inputRefs = {};

    this.state = {
      firstName: "",
      photoURL: this.props.user.pictures
        ? this.props.user.pictures[0]
        : "https://community.intersystems.com/sites/default/files/pictures/picture-default.jpg",
      city: "",
      interestedIn: "",

      gender: undefined,
      userId: this.props.user.login.uid
    };
  }

  componentDidMount() {}
  callUploader = (avatar, position) => {};
  render() {
    const styles = StyleSheet.create({
      container: {
        display: "flex",
        height: this.props.height,
        alignItems: "center",
        width: "100%",
        justifyContent: "space-around"
      },
      header: {
        fontSize: 40,
        fontFamily: "AmaticSC-Regular",
        color: "#3b3a30"
      },
      subheader: {
        fontSize: 20,
        fontFamily: "JosefinSans-Regular",
        color: "#3b3a30"
      },
      signInContainer: {
        backgroundColor: "#eaece5",
        display: "flex",
        flexDirection: "column",
        height: "60%",
        width: 300,
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 6,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 6,
          height: 6
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.5,

        elevation: 5
      },
      usernamePassword: {
        width: "80%",
        fontSize: 30,
        height: 50,
        backgroundColor: "#eaece5",
        fontFamily: "AmaticSC-Regular"
      },
      signinText: {
        fontFamily: "AmaticSC-Bold",
        color: "#3b3a30",
        fontSize: 30,
        letterSpacing: 1
      },
      signinButton: {
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        borderBottomColor: "#c6c5b9",
        borderBottomWidth: 1,
        height: "21%"
      }
    });
    const items = [
      {
        label: "Male",
        value: "male"
      },
      {
        label: "Female",
        value: "female"
      },
      {
        label: "Other",
        value: "other"
      }
    ];

    const interestedIn = [
      {
        label: "Men",
        value: "men"
      },
      {
        label: "Women",
        value: "women"
      },
      {
        label: "All",
        value: "all"
      }
    ];
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Let's setup your profile</Text>

        <View style={styles.signInContainer}>
          <RNPickerSelect
            placeholder={{
              label: "Gender",
              value: null,
              color: "#9EA0A4"
            }}
            items={items}
            onValueChange={value => {
              this.setState({
                gender: value
              });
            }}
            hideIcon={true}
            style={{ ...pickerSelectStyles }}
            value={this.state.gender}
          />
          <RNPickerSelect
            placeholder={{
              label: "Interested In",
              value: null,
              color: "#9EA0A4"
            }}
            items={interestedIn}
            onValueChange={value => {
              this.setState({
                interestedIn: value
              });
            }}
            hideIcon={true}
            style={{ ...pickerSelectStyles }}
            value={this.state.interestedIn}
          />
          <TextInput
            selectionColor="#dddcd5"
            placeholder="first name"
            style={styles.usernamePassword}
            onChangeText={firstName => this.setState({ firstName })}
            value={this.state.firstName}
          />
          <TextInput
            selectionColor="#dddcd5"
            placeholder="city"
            style={styles.usernamePassword}
            onChangeText={city => this.setState({ city })}
            value={this.state.city}
          />
          <PhotoUpload
            onPhotoSelect={avatar => {
              if (avatar) {
                console.log("Image base64 string");
                this.props.addOrReplacePhoto(avatar, 0);
                return this.setState({ photoURL: avatar });
              }
            }}
          >
            <Image
              style={{
                paddingVertical: 30,
                width: 150,
                height: 150,
                borderRadius: 75
              }}
              resizeMode="cover"
              source={{
                uri: this.state.photoURL
              }}
            />
          </PhotoUpload>
          <TouchableOpacity
            onPress={() => {
              this.props.updateRealtime(this.state);
            }}
            style={styles.signinButton}
          >
            <Text style={styles.signinText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    height: 50,
    backgroundColor: "#eaece5",
    fontFamily: "AmaticSC-Regular",
    paddingHorizontal: "10%",
    color: "black"
  },
  inputAndroid: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "white",
    color: "black"
  }
});

const mapStateToProps = state => {
  return { ...state };
};

export default connect(
  mapStateToProps,
  actions
)(ProfileSetup);
