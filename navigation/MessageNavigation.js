import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Message from "../screens/Message";

const Stack = createStackNavigator();

export default function App({ navigation, route }) {
  navigation.setOptions({
    headerTitle: "MESSAGE INCOME"
  });

  return (
    <Stack.Navigator initialRouteName={"Message"} headerMode="none">
      <Stack.Screen name="Message" component={Message} />
    </Stack.Navigator>
  );
}
