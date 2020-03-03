import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../api/fragments";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { ScrollView } from "react-native";

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const View = styled.View``;
const Text = styled.Text``;

export default ({ navigation, route }) => {
  //console.log("--> data", route);
  const { params } = route;
  const { loading, data } = useQuery(POST_DETAIL, {
    variables: { id: params.id }
  });
  //console.log("navigation-->", navigation);
  navigation.setOptions({
    headerTitle: "POST DETAIL",
    headerTitleAlign: "center"
  });
  //console.log("-->loading,data", loading, data);
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFullPost && (
          <Post navigation={navigation} {...data.seeFullPost} />
        )
      )}
    </ScrollView>
  );
};
