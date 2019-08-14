import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { Actions, ActionConst } from "react-native-router-flux";
import SvgUri from "react-native-svg-uri";
import WriteBlurb from "../feed/WriteBlurb";
import cogwheel from "seriouspeoplefront4/assets/GSNN_action/svg/good-idea_26.svg";
import addImage from "seriouspeoplefront4/assets/add-icon.png";
import PhotoUpload from "react-native-photo-upload";

import * as actions from "../../store/actions";
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pic1: this.props.user.pictures[0]
        ? { uri: this.props.user.pictures[0] }
        : addImage,
      pic2: this.props.user.pictures[1]
        ? { uri: this.props.user.pictures[1] }
        : addImage,
      pic3: this.props.user.pictures[2]
        ? { uri: this.props.user.pictures[2] }
        : addImage,
      pic4: this.props.user.pictures[3]
        ? { uri: this.props.user.pictures[3] }
        : addImage,
      pic5: this.props.user.pictures[4]
        ? { uri: this.props.user.pictures[4] }
        : addImage
    };
  }
  render() {
    console.log("pic", this.props.user.pictures[0]);
    const styles = StyleSheet.create({
      container: {
        display: "flex",
        height: this.props.height,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between"
      },
      userPicture: {
        height: 200,
        width: 200,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: "white"
      },
      imageArray: {
        backgroundColor: "white",
        width: 200,
        height: 200,
        borderRadius: 10,
        display: "flex",

        justifyContent: "space-around",
        alignContent: "space-around",
        flexDirection: "row",
        flexWrap: "wrap"
      },
      imageInArray: {
        flex: 1,
        height: 92,
        width: 92,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "gray"
      },

      signupText: {
        fontFamily: "AmaticSC-Regular",
        color: "#3b3a30",
        fontSize: 30,

        letterSpacing: 1
      },
      header: {
        marginTop: 50,
        fontSize: 40,
        fontFamily: "AmaticSC-Regular",
        color: "#3b3a30"
      },
      subheader: {
        marginTop: 5,
        fontSize: 20,
        fontFamily: "JosefinSans-Regular",
        color: "#3b3a30"
      },
      cogwheel: {
        position: "absolute",
        top: 20,
        right: 20
      }
    });

    return [
      <View style={styles.container}>
        <PhotoUpload
          format="PNG"
          onPhotoSelect={avatar => {
            if (avatar) {
              console.log("base64", avatar);
              return this.setState({ pic1: avatar }, () => {
                this.props.addOrReplacePhoto(avatar, 0);
              });
            }
          }}
        >
          <Image
            resizeMethod="resize"
            style={styles.userPicture}
            source={this.state.pic1}
          />
        </PhotoUpload>

        <View style={styles.imageArray}>
          <View style={{ height: 92, width: 92 }}>
            <PhotoUpload
              onPhotoSelect={avatar => {
                if (avatar) {
                  return this.setState({ pic2: avatar }, () => {
                    this.props.addOrReplacePhoto(avatar, 1);
                  });
                }
              }}
            >
              <Image
                onTouch={() => console.log("hello")}
                resizeMethod="resize"
                style={styles.imageInArray}
                source={this.state.pic2}
              />
            </PhotoUpload>
          </View>
          <View style={{ height: 92, width: 92 }}>
            <PhotoUpload
              onPhotoSelect={avatar => {
                if (avatar) {
                  return this.setState({ pic3: avatar }, () => {
                    this.props.addOrReplacePhoto(avatar, 2);
                  });
                }
              }}
            >
              <Image
                onTouch={() => console.log("hello")}
                resizeMethod="resize"
                style={styles.imageInArray}
                source={this.state.pic3}
              />
            </PhotoUpload>
          </View>
          <View style={{ height: 92, width: 92 }}>
            <PhotoUpload
              onPhotoSelect={avatar => {
                if (avatar) {
                  return this.setState({ pic4: avatar }, () => {
                    this.props.addOrReplacePhoto(avatar, 3);
                  });
                }
              }}
            >
              <Image
                onTouch={() => console.log("hello")}
                resizeMethod="resize"
                style={styles.imageInArray}
                source={this.state.pic4}
              />
            </PhotoUpload>
          </View>
          <View style={{ height: 92, width: 92 }}>
            <PhotoUpload
              onPhotoSelect={avatar => {
                if (avatar) {
                  return this.setState({ pic5: avatar }, () => {
                    this.props.addOrReplacePhoto(avatar, 4);
                  });
                }
              }}
            >
              <Image
                onTouch={() => console.log("hello")}
                resizeMethod="resize"
                style={styles.imageInArray}
                source={this.state.pic5}
              />
            </PhotoUpload>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
            onPress={this.props.signOut}
          >
            <Text style={[styles.signupText]}>Sign Out</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
          onPress={this.props.currentUser}
        >
          <Text style={[styles.signupText]}>Current User</Text>
        </TouchableOpacity> */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
            onPress={Actions.ProfileSetup}
          >
            <Text style={[styles.signupText]}>Profile Setup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
            onPress={() => Actions.WriteBlurb()}
          >
            <Text style={[styles.signupText]}>Write Blurb</Text>
          </TouchableOpacity>
        </View>
      </View>,
      // <WriteBlurb />,
      <TouchableOpacity
        style={styles.cogwheel}
        onPress={() => {
          return;
        }}
      >
        <SvgUri width="30" height="30" source={cogwheel} />
      </TouchableOpacity>
    ];
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(
  mapStateToProps,
  actions
)(UserProfile);
