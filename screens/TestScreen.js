import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import {
  RectButton,
  ScrollView,
  TouchableOpacity
} from "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";

const Email = props => {
  const {
    navigation: { navigate }
  } = props;

  return (
    <View>
      <Text>Email</Text>
      <TouchableOpacity
        onPress={() => {
          navigate("Profile");
        }}
      >
        <Text>Go To Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const Profile = props => {
  const {
    navigation: { navigate }
  } = props;

  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={() => {
          navigate("Settings");
        }}
      >
        <Text>Go To Settings</Text>
      </TouchableOpacity>
    </View>
  );
};
const Settings = props => {
  const {
    navigation: { navigate }
  } = props;

  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity
        onPress={() => {
          navigate("Email");
        }}
      >
        <Text>Go To Email</Text>
      </TouchableOpacity>
    </View>
  );
};
const Stack = createStackNavigator();

export default function TestScreen() {
  return (
    <Stack.Navigator initialRouteName="Email">
      <Stack.Screen name="Email" component={Email} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton
      style={[styles.option, isLastOption && styles.lastOption]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  contentContainer: {
    paddingTop: 15
  },
  optionIconContainer: {
    marginRight: 12
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed"
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1
  }
});
