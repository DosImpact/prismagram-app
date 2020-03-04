import React from "react";
import { Image } from "react-native";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default props => {
  const {
    route: {
      params: { photo }
    }
  } = props;
  console.log(photo);
  return (
    <View>
      <Text>UploadPhoto.js</Text>
      <Image source={{ uri: photo.uri }} style={{ width: 100, height: 100 }} />
    </View>
  );
};
