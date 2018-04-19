import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Header } from "../components/Header";

export default class AddNewKeg extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header centerComponent={<Text>Add New Keg</Text>} />
        <ScrollView style={styles.body}>
          <Text>Hanker</Text>
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
