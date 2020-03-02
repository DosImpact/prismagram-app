import React from "react";
import styled from "styled-components";
import { ActivityIndicator } from "react-native";
import theme from "../styles/theme";
import Layout from "../constants/Layout";
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: ${Layout.window.height / 2}px;
`;

export default () => {
  return (
    <Container>
      <ActivityIndicator color={theme.darkGreyColor} />
    </Container>
  );
};
