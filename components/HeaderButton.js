/**
 * for navigation header button (position : right)
 */

import React from "react";
import styled from "styled-components";

const Container = styled.TouchableOpacity``;

const Text = styled.Text``;

export default props => {
  const { text, navigation } = props;
  return (
    <Container
      onPress={() => {
        navigation.navigate("");
      }}
    >
      <Text>{text}</Text>
    </Container>
  );
};
