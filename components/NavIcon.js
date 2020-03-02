import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import theme from "../styles/theme";

export default function NavIcon({ name, size = 26, color = theme.blackColor }) {
  return (
    <Ionicons
      name={name}
      size={size}
      style={{ marginRight: 15 }}
      color={color}
    />
  );
}
