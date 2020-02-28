import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="TabNavigation" headerMode={"none"}>
      <Stack.Screen name="TabNavigation" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
