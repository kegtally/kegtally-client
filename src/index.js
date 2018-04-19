import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import Home from "./screens/Home.js";
import AddNewKeg from "./screens/AddNewKeg.js";

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const client = new ApolloClient({
      uri:
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000/graphql"
          : "https://radiant-refuge-35147.herokuapp.com/graphql"
    });

    return (
      <ApolloProvider client={client}>
        <SafeAreaView style={styles.SafeArea}>
          <Home />
        </SafeAreaView>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
