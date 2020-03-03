import React, { useState } from "react";
import styled from "styled-components";
import { AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView, RefreshControl } from "react-native";
//---test
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Swiper from "react-native-swiper";
import Loader from "../../components/Loader";
import Post from "../../components/Post";
import { POST_FRAGMENT } from "../../api/fragments";

const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  const handleReFetch = async () => {
    try {
      setRefreshing(true);
      await refetch();
      // console.log("--> Data Fechting", loading, data);
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
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => (
          <Post navigation={navigation} key={post.id} {...post} />
        ))
      )}
    </ScrollView>
  );
};
