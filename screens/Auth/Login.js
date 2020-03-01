import React, { useState } from "react";
import styled from "styled-components";

import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";

import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { REQUEST_SECRET } from "./AuthQuery";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Login = ({ navigation }) => {
  const emailInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [REQUEST_SECRET_Mutation] = useMutation(REQUEST_SECRET);

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
        const { data: REQUEST_SECRET_data } = await REQUEST_SECRET_Mutation({
          variables: { email: value }
        });
        const { requestSecret } = REQUEST_SECRET_data;

        if (requestSecret) {
          Alert.alert("check your email");
          navigation.navigate("Confirm", { email: value });
        } else {
          Alert.alert("Account not Found");
          navigation.navigate("Singup", { email: value });
        }
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
