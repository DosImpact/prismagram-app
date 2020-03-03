import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { USER_FRAGMENT } from "../api/fragments";
import Loader from "../components/Loader";
import { ScrollView } from "react-native";
import UserProfile from "../components/UserProfile";

const GET_USER = gql`
  query seeUser($name: String!) {
    seeUser(name: $name) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation, route }) => {
  const { params } = route;
  const { loading, data } = useQuery(GET_USER, {
    variables: { name: params.name }
  });

  navigation.setOptions({
    headerTitle: params.name,
    headerTitleAlign: "center"
  });

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeUser && (
          <UserProfile navigation={navigation} {...data.seeUser} />
        )
      )}
    </ScrollView>
  );
};
