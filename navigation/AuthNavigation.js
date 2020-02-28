import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthHome from "../screens/Auth/AuthHome";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import Singup from "../screens/Auth/Singup";

const Stack = createStackNavigator();

const AuthNavigation = props => {
  return (
    <Stack.Navigator initialRouteName="AuthHome" headerMode={"none"}>
      <Stack.Screen name="AuthHome" component={AuthHome} />
      <Stack.Screen name="Confirm" component={Confirm} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Singup" component={Singup} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
