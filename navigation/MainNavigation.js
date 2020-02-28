import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="TabNavigation">
      <Stack.Screen name="PhotoNavigation" component={PhotoNavigation} />
      <Stack.Screen name="TabNavigation" component={BottomTabNavigator} />
      <Stack.Screen name="MessageNavigation" component={MessageNavigation} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
