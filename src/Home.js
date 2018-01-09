"use strict";

import React, { Component } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Modal
} from "react-native";
import Icon from "./components/Icon.js";
import LiveInventory from "./LiveInventory.js";
import SelectBatch from "./SelectBatch.js";
import Container from "./components/Container.js";

export default class Home extends Component {
  state = { kegsForSale: [] };
  onRead = e => {
    fetch(`http://172.46.2.255:8000/inventory/kegs/${e.data}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(j => {
        if (j.status === null) {
          //Keg's empty... better put somthing in it
          this.props.navigator.push(
            {
              title: "Select Batch",
              component: SelectBatch,
              passProps: {
                kegId: e.data
              }
            },
            this.scanner.reactivate()
          );
        } else {
          //Keg's full... better sell it
          this.setState({ kegsForSale: this.state.kegsForSale.push(j) });
        }
      });
  };

  componentDidMount() {
    //this.scanner.reactivate();
  }

  render() {
    const { navigator } = this.props;
    return (
      <Container>
        <QRCodeScanner
          showMarker
          topViewStyle={styles.zeroContainer}
          bottomViewStyle={styles.zeroContainer}
          cameraStyle={styles.cameraContainer}
          onRead={this.onRead}
          ref={n => (this.scanner = n)}
        />
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
