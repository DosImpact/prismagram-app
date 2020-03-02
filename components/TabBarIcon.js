import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import theme from "../styles/theme";

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={25}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tintColor : theme.blackColor}
    />
  );
}
