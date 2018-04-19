import React, { Component } from "react";
import { View } from "react-native";
import styles from "./styles.js";

export class Header extends Component {
  render() {
    // If there is no left and right components, allow the center component
    // to take up the entire container. Otherwise, keep them to preserve the
    // the layout
    const singleComponent =
      !this.props.leftComponent && !this.props.rightComponent;

    return (
      <View style={styles.headerContainer}>
        {singleComponent ? null : (
          <View style={styles.headerLeft}>{this.props.leftComponent}</View>
        )}
        <View style={styles.headerCenter}>{this.props.centerComponent}</View>
        {singleComponent ? null : (
          <View style={styles.headerRight}>{this.props.rightComponent}</View>
        )}
      </View>
    );
  }
}
