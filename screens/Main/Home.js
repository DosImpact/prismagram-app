import React, { useState } from "react";
import styled from "styled-components";
import { AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView, RefreshControl } from "react-native";
//---test
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
const ME = gql`
  {
    me {
      name
      email
      fullName
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading: ME_loading, data: ME_data, refetch } = useQuery(ME);

  const handleGetToken = async () => {
    const getTokenfromStore = await AsyncStorage.getItem("jwt");
    console.log("--> token from store", getTokenfromStore);
  };

  const handleReFetch = async () => {
    try {
      setRefreshing(true);
      console.log(refetch);
      await refetch();
      console.log("--> Data Fechting with jwt", ME_loading, ME_data);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleReFetch} />
      }
    >
      <Text>Home</Text>
      <TouchableOpacity onPress={handleGetToken}>
        <Text>Get Token</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReFetch}>
        <Text>Get handleReFetch</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
