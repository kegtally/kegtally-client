"use strict";

import React, { Component } from "react";
import NFC from "./components/NFC.js";

export default class Home extends Component {
  render() {
    const { navigator } = this.props;
    return <NFC />;
  }
}
