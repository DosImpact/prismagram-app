import React from "react";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import AuthButton from "../../components/AuthButton";

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
        <AuthButton
          text="Create New Account"
          onPress={() => {
            navigation.navigate("Singup", { name: "KIMDOYOUNG" });
          }}
        />
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
