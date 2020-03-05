import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation, route }) => (
  <View>
    <Text>Notifications</Text>
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Detail", { name: "Notifications" });
      }}
    >
      <Text>Move to Detail</Text>
      <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: "https://prismados.s3.ap-northeast-2.amazonaws.com/1583386318004"
        }}
      />
    </TouchableOpacity>
  </View>
);
