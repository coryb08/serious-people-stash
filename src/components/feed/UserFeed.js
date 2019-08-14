import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import axios from "axios";
import { Actions, ActionConst } from "react-native-router-flux";

class UserFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      refreshing: false
    };
  }

  componentDidMount() {
    this.props.getBlurbs();
    if (this.props.user.status === "good" && !this.props.events.loading) {
      let name = this.props.user.firstName;
      let gender = this.props.user.gender;
      let interestedIn = this.props.user.interestedIn;
      let location = this.props.user.location.city;
      let pictures = this.props.user.pictures["0"];

      if (!name && !gender && !interestedIn && !location && !pictures) {
        setTimeout(() => {
          Actions.ProfileSetup();
        }, 2000);
      }
    }
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.getBlurbs();
    setTimeout(
      () =>
        this.setState({ refreshing: false }, () => {
          Actions.UserFeed({ type: ActionConst.REFRESH });
        }),
      1800
    );
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        display: "flex",
        height: this.props.height,
        width: "100%",
        alignItems: "center"
      },
      headerView: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        width: "100%"
      },
      header: {
        marginTop: 10,
        fontSize: 40,
        fontFamily: "AmaticSC-Regular",
        color: "#3b3a30",
        textAlign: "center"
      },
      subheader: {
        marginTop: 5,
        fontSize: 20,
        fontFamily: "JosefinSans-Regular",
        color: "#3b3a30"
      },
      listImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
        margin: "3%"
      },
      listItem: {
        display: "flex",
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        height: 150,
        justifyContent: "center",

        marginBottom: "2%",
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "lightgray",
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2
      },
      listBlurb: {
        paddingRight: "5%",
        paddingLeft: "2%",
        flexWrap: "wrap",
        fontFamily: "JosefinSans-Regular",
        lineHeight: 18,
        fontSize: 15
      },
      reply: {
        position: "absolute",
        bottom: 0,
        right: 9,
        flexWrap: "wrap"
      },
      flatList: {
        width: "100%"
      }
    });

    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.header}>User Feed</Text>
        </View>
        <FlatList
          style={styles.flatList}
          data={this.props.feed}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text
                style={{
                  position: "absolute",
                  top: "2%",
                  fontFamily: "AmaticSC-Bold"
                }}
              >
                {item.created_at}
              </Text>
              <View
                style={{
                  borderRightWidth: 1,
                  borderRightColor: "gray",
                  display: "flex",
                  alignItems: "center",
                  position: "relative"
                }}
              >
                <Image
                  ImageResizeMode="cover"
                  source={{ uri: item.userImage }}
                  style={styles.listImage}
                  blurRadius={10}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "lightGray",
                    borderRadius: 15,
                    width: "60%",
                    paddingTop: "3%",
                    paddingBottom: "3%"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "JosefinSans-Regular",
                      textAlign: "center"
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  positin: "relative",
                  flex: 1,
                  height: 125
                }}
              >
                <Text style={styles.listBlurb}>{item.blurb}</Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.setReceiver(item.user);

                    setTimeout(
                      () => Actions.Chat({ type: ActionConst.REPLACE }),
                      700
                    );
                  }}
                  style={styles.reply}
                >
                  <Text
                    style={{
                      fontFamily: "AmaticSC-Bold",
                      lineHeight: 18,
                      fontSize: 15
                    }}
                  >
                    Reply to this in messages ->
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

export default connect(
  mapStateToProps,
  actions
)(UserFeed);
