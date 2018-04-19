import { StyleSheet, Platform } from "react-native";
const STATUS_BAR_OFFSET = 35;
const OUTER_COMPONENT_WIDTH = 30;

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: "#00ff00",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? STATUS_BAR_OFFSET : 12,
    paddingBottom: 12,
    paddingLeft: 10,
    paddingRight: 10
  },
  headerLeft: {
    flexGrow: 0,
    width: OUTER_COMPONENT_WIDTH,
    alignItems: "center",
    justifyContent: "center"
  },
  headerCenter: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerRight: {
    flexGrow: 0,
    width: OUTER_COMPONENT_WIDTH,
    alignItems: "center",
    justifyContent: "center"
  }
});
