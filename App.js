import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import { Asset } from "expo-asset";

import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import apolloClientOptions from "./apollo";

import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

import { AuthProvider } from "./AuthContext";

import { useIsLoggedIn, useLogIn, useLogOut } from "./AuthContext";

//TODO MOVE to Screen folder
const Login = () => {
  const isLoggedIn = useIsLoggedIn();
  const logIn = useLogIn();
  const logOut = useLogOut();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoggedIn ? (
        <TouchableOpacity onPress={logOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={logIn}>
          <Text>Log in</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null); //null => 체크안함 | true 체크하고 로긴함 | false 체크하고 로긴안함
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        setInitialNavigationState(await getInitialState());
        await Asset.loadAsync([require("./assets/images/logo.png")]);
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
        });
        const cache = new InMemoryCache();
        await persistCache({
          cache,
          storage: AsyncStorage
        });
        const client = new ApolloClient({
          cache,
          ...apolloClientOptions
        });
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        if (!isLoggedIn || isLoggedIn === "false") {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
        setClient(client);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return client ? (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <AuthProvider isLoggedIn={isLoggedIn}>
            <View style={styles.container}>
              {Platform.OS === "ios" && <StatusBar barStyle="default" />}
              <NavigationContainer
                ref={containerRef}
                initialState={initialNavigationState}
              >
                <Stack.Navigator initialRouteName="Auth">
                  <Stack.Screen name="Root" component={BottomTabNavigator} />
                  <Stack.Screen name="Auth" component={Login} />
                </Stack.Navigator>
              </NavigationContainer>
            </View>
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    ) : (
      <SplashScreen />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
