import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import gql from "graphql-tag";
import { USER_FRAGMENT } from "../../api/fragments";
import Loader from "../../components/Loader";
import { useQuery } from "@apollo/react-hooks";
import UserProfile from "../../components/UserProfile";

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(ME);
  //console.log(data);
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.me && <UserProfile navigation={navigation} {...data.me} />
      )}
    </ScrollView>
  );
};
