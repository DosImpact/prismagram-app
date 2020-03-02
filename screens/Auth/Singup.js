import React, { useState } from "react";
import styled from "styled-components";

import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";

import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_ACCOUNT } from "./AuthQuery";

import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${props => props.theme.lightGreyColor};
  border-style: solid;
`;
const Text = styled.Text``;

const Login = ({ navigation }) => {
  const emailInput = useInput("");
  const nameInput = useInput("");
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const bioNameInput = useInput("");

  const [loading, setLoading] = useState(false);
  const [CREATE_ACCOUNT_mutation] = useMutation(CREATE_ACCOUNT);

  const handleSignUp = async () => {
    const { value: email } = emailInput;
    const { value: name } = nameInput;
    const { value: firstName } = firstNameInput;
    const { value: lastName } = lastNameInput;
    const { value: bioName } = bioNameInput;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    if (name === "") {
      return Alert.alert("Invalid username");
    }
    try {
      setLoading(true);
      const { data: CREATE_ACCOUNT_data } = await CREATE_ACCOUNT_mutation({
        variables: {
          email: email,
          name: name,
          firstName: firstName,
          lastName: lastName,
          bioName: bioName
        }
      });
      console.log(CREATE_ACCOUNT_data);
      if (CREATE_ACCOUNT_data.createAccount) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("name or email taken.", JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const fbLogin = async () => {
    try {
      await Facebook.initializeAsync("230353268007145");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"]
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
        );
        //Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
        const { email, first_name, last_name } = await response.json();
        updateFromData(email, first_name, last_name);
        setLoading(false);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const googleLogin = async () => {
    const GOOGLE_ID_iosClient =
      "1048824293201-hkjen58cu3256p8l5fo9l87q6ab5l41m.apps.googleusercontent.com";
    const GOOGLE_ID_AndroidClient =
      "1048824293201-hto3c3v87unpql4o4c795lfkc0pqkm8n.apps.googleusercontent.com";
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        androidClientId: GOOGLE_ID_AndroidClient,
        iosClientId: GOOGLE_ID_iosClient,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${result.accessToken}` }
          }
        );
        const {
          email,
          family_name,
          given_name
        } = await userInfoResponse.json();
        updateFromData(email, given_name, family_name);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    } finally {
      setLoading(false);
    }
  };
  const updateFromData = (email, firstName, lastName) => {
    emailInput.setValue(email);
    firstNameInput.setValue(firstName);
    lastNameInput.setValue(lastName);
    const [name] = email.split("@");
    nameInput.setValue(name);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AuthInput {...nameInput} placeholder="name" autoCorrect={false} />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          autoCorrect={false}
        />
        <AuthInput
          {...firstNameInput}
          placeholder="firstName"
          autoCorrect={false}
          autoCapitalize="words"
        />
        <AuthInput
          {...lastNameInput}
          placeholder="lastName"
          autoCorrect={false}
          autoCapitalize="words"
        />
        <AuthInput
          {...bioNameInput}
          placeholder="bioName"
          autoCorrect={false}
        />
        <AuthButton onPress={handleSignUp} text="Sign Up" loading={loading} />
        <FBContainer>
          <AuthButton
            bgColor={"#2D4DA7"}
            loading={false}
            onPress={fbLogin}
            text="Connect Facebook"
          />
          <AuthButton
            bgColor={"#EE1922"}
            loading={false}
            onPress={googleLogin}
            text="Connect Google"
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
