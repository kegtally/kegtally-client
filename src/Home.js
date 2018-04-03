"use strict";

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Modal
} from "react-native";
import Icon from "./components/Icon.js";
import Container from "./components/Container.js";

export default class Home extends Component {
  render() {
    const { navigator } = this.props;
    return (
      <Container>
        <View style={styles.bottomPanel}>
          <Icon name="keg" color="#fff" style={styles.icon} />
          <Icon
            name="book"
            color="#fff"
            style={styles.icon}
            onPress={e =>
              navigator.push({
                title: "Live Inventory",
                component: LiveInventory
              })
            }
          />
          <Icon
            name="tag"
            color={this.state.kegsForSale.length > 0 ? "red" : "#fff"}
            style={styles.icon}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  zeroContainer: {
    height: 0,
    flex: 0
  },
  cameraContainer: {
    height: Dimensions.get("window").height
  },
  bottomPanel: {
    position: "absolute",
    bottom: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  icon: {
    backgroundColor: "transparent",
    fontSize: 40,
    alignSelf: "flex-end",
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center"
  }
});
