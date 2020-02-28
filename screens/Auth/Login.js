import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsLoggedIn, useLogIn, useLogOut } from "../../AuthContext";

import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";

import useInput from "../../hooks/useInput";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Login = () => {
  const isLoggedIn = useIsLoggedIn();
  const logIn = useLogIn();
  const logOut = useLogOut();
  const emailInput = useInput("");
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AuthInput
        {...emailInput}
        placeholder="Email"
        keyboardType="email-address"
      />
      <AuthButton onPress={() => null} text="Log In" />
      {/* {isLoggedIn ? (
        <TouchableOpacity onPress={logOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={logIn}>
          <Text>Log in</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export default Login;
