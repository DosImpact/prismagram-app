import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import Layout from "../../constants/Layout";
const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Image = styled.Image`
  width: ${Math.ceil(Layout.screen.width / 2)}px;
`;
const Touchable = styled.TouchableOpacity`
  margin: 10px;
`;
const SignUpBtn = styled.View`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${Layout.screen.width / 2}px;
`;
const SignUpBtnText = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color: ${props => props.theme.blueColor};
  font-weight: 600;
`;

export default ({ navigation }) => {
  return (
    <View>
      <Image
        resizeMode={"contain"}
        source={require("../../assets/images/logo.png")}
      ></Image>
      <View>
        <Touchable
          onPress={() => {
            navigation.navigate("Singup");
          }}
        >
          <SignUpBtn>
            <SignUpBtnText>Sign Up </SignUpBtnText>
          </SignUpBtn>
        </Touchable>
        <Touchable
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <LoginLink>
            <LoginLinkText>Log in</LoginLinkText>
          </LoginLink>
        </Touchable>
      </View>
    </View>
  );
};
