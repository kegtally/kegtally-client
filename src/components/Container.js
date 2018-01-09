"use strict";
import React, { Component } from "react";

import { View, Text, Dimensions } from "react-native";

export default class LiveInventory extends Component {
  render() {
    const { children, title, top } = this.props;
    return (
      <View
        style={{
          flex: 1,
          height: Dimensions.get("window").height,
          justifyContent: !top ? "center" : "flex-start",
          paddingTop: !top ? 0 : 80,
          flexDirection: "column"
        }}
      >
        {!!title ? <Text>{title}</Text> : null}
        {children}
      </View>
    );
  }
}
