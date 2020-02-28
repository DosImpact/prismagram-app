import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default props => {
  const {
    navigation: { navigate }
  } = props;
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigate("UploadPhoto");
        }}
      >
        <Text>TakePhoto.js</Text>
      </TouchableOpacity>
    </View>
  );
};
