import React, { useState } from "react";
import styled from "styled-components";

import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";

import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
//Cofrim
import { useMutation } from "@apollo/react-hooks";
import { CONFIRM_SECRET } from "./AuthQuery";
import { useLogIn } from "../../AuthContext";
const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Login = ({ navigation, route }) => {
  //console.log(route.params); // variable from nav to nav
  const confirmInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [CONFIRM_SECRET_mutation] = useMutation(CONFIRM_SECRET);
  const logIn = useLogIn();
  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === "" || !value.includes(" ")) {
      return Alert.alert("invalid Secret");
    } else {
      try {
        setLoading(true);
        const { data: CONFIRM_SECRET_data } = await CONFIRM_SECRET_mutation({
          variables: { email: route.params.email, secret: confirmInput.value }
        });
        const { confirmSecret } = CONFIRM_SECRET_data;
        console.log("token from server : ", confirmSecret);
        if (confirmSecret !== "") {
          logIn(confirmSecret);
          navigation.navigate("Root");
        } else {
          Alert.alert("Wrong secret");
        }
      } catch (error) {
        Alert.alert("Can't confirm Secret");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AuthInput
          {...confirmInput}
          placeholder="Secret"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
        />
        <AuthButton onPress={handleConfirm} text="Confirm" loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
