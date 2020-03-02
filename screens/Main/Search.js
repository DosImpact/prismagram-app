import React, { useState } from "react";
import styled from "styled-components";
import { TextInput } from "react-native";
import theme from "../../styles/theme";
import Layout from "../../constants/Layout";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const SearchBar = ({ onChange, value, onSubmit }) => {
  return (
    <TextInput
      onChangeText={onChange}
      value={value}
      onEndEditing={onSubmit}
      placeholder="🔎 Search"
      placeholderTextColor={`${theme.darkGreyColor}`}
      returnKeyType="search"
      style={{
        backgroundColor: theme.blackColor,
        width: Layout.screen.width - 40,
        height: 35,
        paddingHorizontal: 15,
        textAlign: "center",
        borderRadius: 10,
        color: `${theme.darkGreyColor}`
      }}
    ></TextInput>
  );
};

export default ({ navigation, route }) => {
  const [searchInput, setSearchInput] = useState("");
  const handleOnChange = text => {
    setSearchInput(text);
  };
  const handleSubmit = () => {
    console.log("--> Submit -->", searchInput);
  };
  navigation.setOptions({
    headerTitle: () => (
      <SearchBar
        onChange={handleOnChange}
        value={searchInput}
        onSubmit={handleSubmit}
      />
    )
  });

  return (
    <View>
      <Text>Search.js</Text>
    </View>
  );
};
