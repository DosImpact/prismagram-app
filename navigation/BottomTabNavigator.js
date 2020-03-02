import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import TabBarIcon from "../components/TabBarIcon";

import {
  Home,
  Notifications,
  Profile,
  Search,
  Add
} from "../screens/Main/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, Image } from "react-native";
import HeaderButton from "../components/HeaderButton";
import NavIcon from "../components/NavIcon";
import { color } from "react-native-reanimated";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

const Stack = createStackNavigator();

const LogoImage = () => {
  return (
    <Image
      style={{ height: 35 }}
      resizeMode="contain"
      source={require("../assets/images/logo.png")}
    />
  );
};

const MessageIcon = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("MessageNavigation");
      }}
    >
      <NavIcon
        name={Platform.OS === "ios" ? "ios-paper-plane" : "md-paper-plane"}
      />
    </TouchableOpacity>
  );
};

export default function BottomTabNavigator({ navigation, route }) {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: { backgroundColor: "#FAFAFA" }
      }}
    >
      <BottomTab.Screen
        name="HomeTab"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-home" : "md-home"}
            />
          )
        }}
      >
        {props => (
          <Stack.Navigator {...props}>
            <Stack.Screen
              name="HomeTabStack"
              component={Home}
              options={{
                headerTitleAlign: "center",
                headerTitle: () => <LogoImage />,
                headerRight: () => <MessageIcon navigation={navigation} />
              }}
            />
          </Stack.Navigator>
        )}
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: "Notifications",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-heart" : "md-heart"}
            />
          )
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={Add}
        options={{
          title: "Add",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-add" : "md-add"}
            />
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
            <TabBarIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-person" : "md-person"}
            />
          )
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={Search}
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-search" : "md-search"}
            />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}
