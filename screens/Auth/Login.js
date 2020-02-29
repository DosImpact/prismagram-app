import React, { useState } from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsLoggedIn, useLogIn, useLogOut } from "../../AuthContext";

import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";

import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { LOG_IN } from "./AuthQuery";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Login = ({ navigation }) => {
  const isLoggedIn = useIsLoggedIn();
  const logIn = useLogIn();
  const logOut = useLogOut();

  const emailInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [requestSecret, { data: LOG_IN_Data }] = useMutation(LOG_IN);

  const handleLogin = async () => {
    const { value } = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === "") {
      return Alert.alert("Email can't be empty");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("invalid Email");
    } else {
      try {
        setLoading(true);
        await requestSecret({ variables: { email: "ypd03008@gmail.com" } });
        Alert.alert("check your email");
        //console.log(LOG_IN_Data);
        navigation.navigate("Confirm");
      } catch (error) {
        console.log(error);
        Alert.alert("Can't log in now");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          returnKeyType="send"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton onPress={handleLogin} text="Log In" loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
