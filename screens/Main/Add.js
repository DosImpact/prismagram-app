import * as React from "react";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const { navigate } = navigation;
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", e => {
      e.preventDefault();
      navigate("PhotoNavigation");
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View>
      <Text>Add</Text>
    </View>
  );
};
