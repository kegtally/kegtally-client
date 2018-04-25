"use strict";
import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import NfcManager, { NdefParser } from "react-native-nfc-manager";
import { Header } from "../components/Header";
import NFC from "../components/NFC.js";

export default class Home extends Component {
  componentDidMount() {
    NfcManager.isSupported().then(supported => {
      this.setState({ supported });
      if (supported) {
        this._startNfc();
      }
    });
  }

  componentWillUnmount() {
    if (this._stateChangedSubscription) {
      this._stateChangedSubscription.remove();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this._startDetection}>
          <View style={styles.button}>
            <Text style={{ color: "white" }}>{"Scan a Keg"}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _startNfc() {
    NfcManager.start({
      onSessionClosedIOS: () => {
        console.log("ios session closed");
      }
    })
      .then(result => {
        console.log("start OK", result);
      })
      .catch(error => {
        console.warn("start fail", error);
        this.setState({ supported: false });
      });

    if (Platform.OS === "android") {
      NfcManager.getLaunchTagEvent()
        .then(tag => {
          console.log("launch tag", tag);
          if (tag) {
            this.setState({ tag });
          }
        })
        .catch(err => {
          console.log(err);
        });
      NfcManager.isEnabled()
        .then(enabled => {
          this.setState({ enabled });
        })
        .catch(err => {
          console.log(err);
        });
      NfcManager.onStateChanged(event => {
        if (event.state === "on") {
          this.setState({ enabled: true });
        } else if (event.state === "off") {
          this.setState({ enabled: false });
        } else if (event.state === "turning_on") {
          // do whatever you want
        } else if (event.state === "turning_off") {
          // do whatever you want
        }
      })
        .then(sub => {
          this._stateChangedSubscription = sub;
          // remember to call this._stateChangedSubscription.remove()
          // when you don't want to listen to this anymore
        })
        .catch(err => {
          console.warn(err);
        });
    }
  }

  _onTagDiscovered = tag => {
    this.setState({ tag });
    //this._fetchKeg(tag.id);
    //this.props.navigation.navigate("Modal");
  };

  _startDetection = () => {
    NfcManager.registerTagEvent(this._onTagDiscovered)
      .then(result => {
        console.log("registerTagEvent OK", result);
      })
      .catch(error => {
        console.warn("registerTagEvent fail", error);
      });
  };

  _stopDetection = () => {
    NfcManager.unregisterTagEvent()
      .then(result => {
        console.log("unregisterTagEvent OK", result);
      })
      .catch(error => {
        console.warn("unregisterTagEvent fail", error);
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  body: {
    padding: 20
  },
  button: {
    height: 45,
    width: 350,
    backgroundColor: "#0075ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10
  }
});
