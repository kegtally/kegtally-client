"use strict";
import React, { Component } from "react";
import Container from "./components/Container.js";
import Home from "./Home.js";

import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from "react-native";

export default class SelectBatch extends Component {
  state = { batches: [], loading: true };

  componentDidMount() {
    fetch(`http://172.46.2.255:8000/inventory/batches/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(j => {
        this.setState({ batches: j, loading: false });
      });
  }

  _onPressButton = id => {
    const { kegId, navigator } = this.props;
    fetch(`http://172.46.2.255:8000/inventory/kegs/${kegId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        batch: id
      })
    })
      .then(res => {
        navigator.push({
          title: "Scan Keg",
          component: Home
        });
      })
      .catch(e => {
        //this.setState({ x: e });
      });
  };

  render() {
    const { batches, loading } = this.state;
    const { keg } = this.props;
    return (
      <Container
        title="This keg is empty, select which batch you're filling it with."
        top={true}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <FlatList
              data={batches.map(b => ({ ...b, key: b.created }))}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => this._onPressButton(item.id)}
                >
                  <Text style={styles.item} key={item.created}>
                    {item.litres}L {item.beer.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </Container>
    );
  }
}

const styles = {
  item: {
    fontSize: 30
  }
};
