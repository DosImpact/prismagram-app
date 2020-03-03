import React, { useState, useEffect } from "react";
import { ScrollView, RefreshControl, Image } from "react-native";
import styled from "styled-components";
import { TextInput } from "react-native";
import theme from "../../styles/theme";
import Layout from "../../constants/Layout";
import SquarePhoto from "../../components/SquarePhoto";

//api
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../../components/Loader";

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
  }
`;

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
  const [refreshing, setRefreshing] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: { term: searchInput },
    fetchPolicy: "network-only"
  });

  const handleOnChange = text => {
    console.log("-->handleOnChange", text);
    setSearchInput(text);
  };
  const handleSubmit = async () => {
    console.log("-->handleSubmit", refreshing, fetchTrigger);
    setFetchTrigger(l => !l);
    setRefreshing(l => !l);
  };
  const handleRefresh = async () => {
    setFetchTrigger(l => !l);
  };
  useEffect(() => {
    const handleData = async () => {
      try {
        await refetch();
      } catch (error) {
      } finally {
      }
    };
    console.log("-->useEffect fetchTrigger", fetchTrigger, refreshing);
    if (refreshing) {
      handleData();
    }
  }, [fetchTrigger]);

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
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.searchPost &&
        data.searchPost.map(post => <SquarePhoto key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};

const TextPhoto = props => {
  console.log(props);
  return (
    <View>
      <Text>TextPhoto</Text>
    </View>
  );
};
