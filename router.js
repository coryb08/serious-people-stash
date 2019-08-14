import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Actions,
  Router,
  Scene,
  Reducer,
  ActionConst,
  Stack,
  Lightbox
} from "react-native-router-flux";
import * as actions from "./src/store/actions";
import SignInUp from "./src/components/SignInUp";
import Landing from "./src/components/Landing";
import EmailSignUp from "./src/components/signUp/EmailSignUp";
import ProfileSetup from "./src/components/profiles/ProfileSetup";
import UserProfile from "./src/components/profiles/UserProfile";
import Chat from "./src/components/messages/Chat";
import MessageFeed from "./src/components/messages/MessageFeed";
// import { View } from "react-native";
import FacebookSignUp from "./src/components/signUp/FacebookSignUp";
import UserFeed from "./src/components/feed/UserFeed";
import WriteBlurb from "./src/components/feed/WriteBlurb";
import SplashScreen from "./src/components/SplashScreen";
// import { AsyncStorage } from "react-native";
import HocWithoutNav from "./src/components/HocWithoutNav";
import HocWithNav from "./src/components/HocWithNav";

const reset = { type: "reset" };

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = { loadRouter: false, shouldUpdate: true, initial: "splash" };
    // this.props.signOut();
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.state.initial == nextState.initial) {
      return false;
    } else return true;
  };

  // componentDidMount = () => {
  // };

  // shouldLoad = () => {
  //   if (this.props.user.status === "good") {
  //     setTimeout(() => this.setState({ shouldUpdate: false }), 1000);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  setInitial = initial => {
    this.setState({ initial });
  };

  shouldLoadSignInUp = () => {
    console.log("shouldLoadSignInUp", this.props.user.status !== "good");
    this.state.initial == "SignInUp" ? true : false;
  };

  shouldLoadProfileSetup = () => {
    console.log("shouldLoadProfileSetup", this.state.userProfile === false);
    this.state.initial == "ProfileSetup" ? true : false;
  };

  shouldLoadUserFeed = () => {
    console.log("shouldLoadUserFeed", this.state.userProfile === true);
    this.state.initial == "UserFeed" ? true : false;
  };

  loadRouter = bool => {
    this.setState({ loadRouter: bool });
  };
  render() {
    if (this.state.initial === "splash") {
      return (
        <Router>
          <Scene hideNavBar={true} key="root">
            {/* <Scene key="splashScreen" component={SplashScreen} initial /> */}
            <Scene
              key="SignInUp"
              hideBackImage={true}
              component={HocWithoutNav(SignInUp)}
              initial={this.shouldLoadSignInUp()}
            />
            <Scene
              key="Landing"
              previous={() => Actions.SignInUp()}
              component={HocWithNav(Landing)}
            />

            <Scene
              key="EmailSignUp"
              previous={() => Actions.SignInUp()}
              component={HocWithoutNav(EmailSignUp)}
            />
            <Scene
              key="FacebookSignUp"
              previous={() => Actions.SignInUp()}
              hideBackImage={false}
              component={HocWithNav(FacebookSignUp)}
            />
            <Scene
              key="ProfileSetup"
              previous={() => Actions.EmailSignUp()}
              component={HocWithNav(ProfileSetup)}
              initial={this.shouldLoadProfileSetup()}
            />
            <Scene
              key="Chat"
              hideNavBar={true}
              previous={() => Actions.SignInUp()}
              component={HocWithNav(Chat)}
            />
            <Scene
              key="MessageFeed"
              previous={() => Actions.SignInUp()}
              component={HocWithNav(MessageFeed)}
            />

            <Scene
              key="UserFeed"
              previous={() => Actions.SignInUp()}
              component={HocWithNav(UserFeed)}
              initial={this.shouldLoadUserFeed()}
            />

            <Scene
              key="UserProfile"
              previous={() => Actions.SignInUp()}
              component={HocWithNav(UserProfile)}
            />
            <Scene
              key="WriteBlurb"
              previous={() => Actions.SignInUp()}
              hideNavBar={true}
              component={WriteBlurb}
            />
          </Scene>
        </Router>
      );
    } else {
      return (
        <SplashScreen
          setInitial={init => this.setInitial(init)}
          // loadRouter={this.loadRouter}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isConnectedStore: state.events.isConnected,
    ...state
  };
};

const ConnectedRouter = connect(
  mapStateToProps,
  actions
)(AppRouter);

export default {
  ConnectedRouter: ConnectedRouter
};
