import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Layout from "../constants/Layout";

const Touchable = styled.TouchableOpacity`
  margin: 10px;
`;
const Container = styled.View`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${Layout.screen.width / 2}px;
`;
const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const AuthButton = ({ text, onPress }) => {
  return (
    <Touchable onPress={onPress}>
      <Container>
        <Text>{text}</Text>
      </Container>
    </Touchable>
  );
};

AuthButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};
export default AuthButton;