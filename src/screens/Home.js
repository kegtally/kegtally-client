"use strict";
import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Header } from "../components/Header";
import NFC from "../components/NFC.js";

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header centerComponent={<Text>Home</Text>} />
        <ScrollView>
          <NFC />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  body: {
    padding: 20
  }
});
