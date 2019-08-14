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

export default class ProfileOptions extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Finish Setting Up Your Profile</Text>
        <Text style={styles.subheader}>Where Would You Like to Start?</Text>
        <View style={styles.listContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              { borderTopRightRadius: 6, borderTopLeftRadius: 6 }
            ]}
          >
            <Text style={[styles.optionText, { marginLeft: 20 }]}>
              upload & edit pictures
            </Text>
            <Text style={[styles.optionText, { marginRight: 20 }]}>-></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={[styles.optionText, { marginLeft: 20 }]}>
              tell about yourself
            </Text>
            <Text style={[styles.optionText, { marginRight: 20 }]}>-></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={[styles.optionText, { marginLeft: 20 }]}>
              work & education
            </Text>
            <Text style={[styles.optionText, { marginRight: 20 }]}>-></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={[styles.optionText, { marginLeft: 20 }]}>
              personal stats
            </Text>
            <Text style={[styles.optionText, { marginRight: 20 }]}>-></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={[styles.optionText, { marginLeft: 20 }]}>goals</Text>
            <Text style={[styles.optionText, { marginRight: 20 }]}>-></Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              { borderBottomRightRadius: 6, borderBottomLeftRadius: 6 }
            ]}
          >
            <Text style={[styles.optionText, { marginLeft: 20 }]}>
              what are you looking for
            </Text>
            <Text style={[styles.optionText, { marginRight: 20 }]}>-></Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center"
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
  option: {
    backgroundColor: "#f0f0f0",
    borderBottomColor: "#919782",
    borderBottomWidth: 1,
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  optionText: {
    fontSize: 30,
    fontFamily: "AmaticSC-Regular",
    color: "#3b3a30"
  },
  listContainer: {
    marginTop: 45,
    borderRadius: 6,
    height: "60%",
    width: "80%",
    borderColor: "#919782",
    borderWidth: 1,
    display: "flex",
    shadowColor: "#000",
    shadowOffset: {
      width: 6,
      height: 6
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,

    elevation: 5
  }
});
