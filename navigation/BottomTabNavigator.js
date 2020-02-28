import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBarIcon from "../components/TabBarIcon";

import {
  Home,
  Notifications,
  Profile,
  Search,
  Add
} from "../screens/Main/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  console.log(navigation, route);
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
    headerTitleAlign: "center",
    headerRight: () => (
      <TouchableOpacity>
        <Text>HELLO</Text>
      </TouchableOpacity>
    )
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          )
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: "Notifications",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          )
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={Add}
        options={{
          title: "Add",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          )
        }}
        listeners={{
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            console.log("is work>?!");
          }
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          )
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={Search}
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "HOME";
    case "Notifications":
      return "NOTICE";
    case "Add":
      return "ADD PHOTH";
    case "Profile":
      return "PROFILE";
    case "Search":
      return "SEARCH";
  }
}
