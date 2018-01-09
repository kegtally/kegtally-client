"use strict";
import React, { Component } from "react";
import Container from "./components/Container.js";

import { NavigatorIOS, View, Text, FlatList, Dimensions } from "react-native";

export default class LiveInventory extends Component {
  state = { inventory: [], x: "" };
  componentDidMount() {
    fetch(`http://172.46.2.255:8000/inventory/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(i => {
        this.setState({ inventory: i, loading: false, x: JSON.stringify(i) });
      });
  }

  generateRows = inventory => {
    return inventory.reduce((acc, inv) => {
      if (!!inv.keg.status) {
        if (!acc[inv.keg.status]) {
          acc[inv.keg.status] = { "30": 0, "20": 0, "50": 0 };
          acc[inv.keg.status][inv.keg.litres] = 1;
        } else {
          acc[inv.keg.status][inv.keg.litres] += 1;
        }
      }
      return acc;
    }, {});
  };

  render() {
    const { inventory } = this.state;

    return (
      <Container top title={""}>
        <View style={{ height: Dimensions.get("window").height }}>
          <FlatList
            style={styles.row}
            data={Object.entries(this.generateRows(inventory)).map((x, y) => ({
              name: x[0],
              quantities: x[1],
              key: x[0]
            }))}
            renderItem={({ item }) => {
              return (
                <Text style={styles.item}>
                  {item.name} - ({item.quantities["20"]},{" "}
                  {item.quantities["30"]}, {item.quantities["50"]}),
                </Text>
              );
            }}
          />
        </View>
      </Container>
    );
  }
}

const styles = {
  row: {
    display: "flex",
    flexDirection: "row"
  },
  item: {
    fontSize: 20,
    flex: 1
  }
};
