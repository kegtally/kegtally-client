import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  TouchableOpacity,
  Linking,
  TextInput,
  ScrollView
} from "react-native";
import NfcManager, { NdefParser } from "react-native-nfc-manager";

class NFC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supported: true,
      enabled: false,
      isWriting: false,
      tag: {},
      keg: {}
    };
  }

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
    let { supported, enabled, tag, isWriting, keg } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>{`Keg Tally 0.0.1`}</Text>

          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={this._startDetection}
          >
            <Text style={{ color: "blue" }}>Start Tag Detection</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={this._stopDetection}
          >
            <Text style={{ color: "red" }}>Stop Tag Detection</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={this._clearMessages}
          >
            <Text>Clear</Text>
          </TouchableOpacity>

          <Text style={{ marginTop: 20 }}>{`Current tag JSON: ${JSON.stringify(
            tag
          )}`}</Text>

          <Text style={{ marginTop: 20 }}>{`Current keg JSON: ${JSON.stringify(
            keg
          )}`}</Text>
        </View>
      </ScrollView>
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
    this._fetchKeg(tag.id);
  };

  _fetchKeg = id => {
    fetch("https://radiant-refuge-35147.herokuapp.com/graphql/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
        keg(tag: "${id}") {
          id,
          fill {
            batch {
            beer {
              name
            }
          }
          }
        }
      }`
      })
    })
      .then(res => res.json())
      .then(res => this.setState({ keg: res }));
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

  _clearMessages = () => {
    this.setState({ tag: null, keg: null });
  };

  _goToNfcSetting = () => {
    if (Platform.OS === "android") {
      NfcManager.goToNfcSetting()
        .then(result => {
          console.log("goToNfcSetting OK", result);
        })
        .catch(error => {
          console.warn("goToNfcSetting fail", error);
        });
    }
  };

  _parseUri = tag => {
    if (tag.ndefMessage) {
      let result = NdefParser.parseUri(tag.ndefMessage[0]),
        uri = result && result.uri;
      if (uri) {
        console.log("parseUri: " + uri);
        return uri;
      }
    }
    return null;
  };
}

export default NFC;
