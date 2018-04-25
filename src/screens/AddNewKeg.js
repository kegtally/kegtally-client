import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity
} from "react-native";
import { Header } from "../components/Header";

export default class AddNewKeg extends React.Component {
  static navigationOptions = {
    title: "Modal"
  };

  modalScreenButtonPressed() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{"You've reached the second screen. You can go back now."}</Text>
        <TouchableOpacity onPress={() => this.modalScreenButtonPressed()}>
          <View style={styles.button}>
            <Text style={{ color: "white" }}>{"Go back"}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    height: 45,
    width: 350,
    backgroundColor: "#0075ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10
  },
  body: {
    padding: 20
  }
});
