import React from "react";
import { StackNavigator } from "react-navigation";

import { Home, AddNewKeg } from "../screens/";

const MainNavigator = StackNavigator({
  Main: { screen: Home }
});

export default (Root = StackNavigator(
  {
    Main: { screen: MainNavigator },

    /** MODAL SCREENS GO HERE **/
    Modal: { screen: AddNewKeg }
  },
  {
    mode: "modal", // Remember to set the root navigator to display modally.
    headerMode: "none" // This ensures we don't get two top bars.
  }
));
