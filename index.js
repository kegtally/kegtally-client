"use strict";
import { AppRegistry } from "react-native";
import React, { Component } from "react";
import Home from "./src/Home";

import { NavigatorIOS } from "react-native";

class App extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Home,
          title: "Scan Keg"
        }}
        style={{ flex: 1 }}
      />
    );
  }
}

AppRegistry.registerComponent("KegTally", () => App);
