import * as React from "react";
import { Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { SelectPhoto, TakePhoto, UploadPhoto } from "../screens/Photo/index";

import theme from "../styles/theme";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PhotoTabs = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: theme.blackColor
        },
        tabStyle: {
          backgroundColor: theme.greyColor
        }
      }}
    >
      <Tab.Screen name="Select" component={SelectPhoto} />
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Stack.Navigator initialRouteName={"PhotoTabs"} headerMode={"screen"}>
      <Stack.Screen name="PhotoTabs" component={PhotoTabs} />
      <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
    </Stack.Navigator>
  );
}
