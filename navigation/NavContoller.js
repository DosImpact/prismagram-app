import React from "react";
import { View } from "react-native";
import { useIsLoggedIn } from "../AuthContext";

import AuthNavigation from "./AuthNavigation";
import TabNavigation from "./BottomTabNavigator";

export default () => {
  const isLoggedIn = true;
  return <View>{isLoggedIn ? <TabNavigation /> : <AuthNavigation />}</View>;
};
