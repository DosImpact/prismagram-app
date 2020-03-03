import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    </TouchableOpacity>
  </View>
);
