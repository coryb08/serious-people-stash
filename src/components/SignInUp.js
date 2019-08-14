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
import fb from "../../assets/Good-Stuff-No-Nonsense-Social-Icons/PNG/128x128px/facebook.png";
import email from "../../assets/Good-Stuff-No-Nonsense-Social-Icons/PNG/128x128px/envelope.png";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { Actions } from "react-native-router-flux";
import {
  LoginManager,
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
class SignInUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }
  _responseInfoCallback = (error, result) => {
    if (error) {
      alert("Error fetching data: " + error.toString());
    } else {
      console.log("fb res", result);
    }
  };
  componentDidMount() {}
  render() {
    return [
      <Text style={styles.header}>Have an account?</Text>,
      <View style={styles.signInContainer}>
        <TextInput
          selectionColor="#dddcd5"
          placeholder="username"
          style={styles.usernamePassword}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          selectionColor="#dddcd5"
          placeholder="password"
          secureTextEntry={true}
          style={styles.usernamePassword}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.signInRunner({
              email: this.state.email,
              password: this.state.password
            })
          }
          style={styles.signinButton}
        >
          <Text style={styles.signinText}>Sign In</Text>
        </TouchableOpacity>
      </View>,
      <View style={styles.signUpContainer}>
        {/* <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
          onPress={() => {
            console.log(this.props.state.user);
          }}
        >
          <Text style={[styles.signupText]}>current user</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
          onPress={this.props.facebookLogin}
        >
          <Image style={styles.signupImg} source={fb} />
          <Text style={[styles.signupText]}>continue with facebook</Text>
        </TouchableOpacity>
        {/* <LoginButton
          readPermissions={["email", "public_profile"]}
          onLoginFinished={(error, result) => {
            if (error) {
              alert("Login failed with error: " + error.message);
            } else if (result.isCancelled) {
              alert("Login was cancelled");
            } else {
              console.log("token", result);
              AccessToken.getCurrentAccessToken().then(data => {
                this.props.sendFacebookDataToFirebase(data.accessToken);
                // const infoRequest = new GraphRequest(
                //   "/me?fields=email",
                //   null,
                //   this._responseInfoCallback
                // );
                // // Start the graph request.
                // new GraphRequestManager().addRequest(infoRequest).start();
              });
            }
          }}
          onLogoutFinished={() => alert("User logged out")}
        /> */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 30
          }}
          onPress={() => Actions.EmailSignUp()}
        >
          <Image style={styles.signupImg} source={email} />
          <Text style={[styles.signupText, { marginLeft: 10 }]}>
            sign up with email
          </Text>
        </TouchableOpacity>
      </View>
    ];
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(
  mapStateToProps,
  actions
)(SignInUp);

const styles = StyleSheet.create({
  boldText: {
    fontFamily: "JosefinSans-Regular",
    color: "#3b3a30",
    letterSpacing: 1
  },
  header: {
    marginTop: 100,
    fontSize: 50,
    fontFamily: "AmaticSC-Regular"
  },
  signInContainer: {
    backgroundColor: "#eaece5",
    display: "flex",
    flexDirection: "column",
    height: "30%",
    width: "80%",
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
    borderBottomColor: "#c6c5b9",
    borderBottomWidth: 1,
    height: "21%"
  },
  signUpContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "20%",
    width: "80%",
    flexDirection: "column",
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 100
  },
  fbsignup: {
    borderRadius: 3,
    display: "flex",
    width: "71%",
    justifyContent: "center",
    alignItems: "center"
  },
  signupImg: {
    height: 35,
    width: 35
  },
  signupText: {
    fontFamily: "AmaticSC-Regular",
    color: "#3b3a30",
    fontSize: 30,

    letterSpacing: 1
  }
});
