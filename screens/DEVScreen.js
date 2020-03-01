import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const OEN_USER = gql`
  query getOneUserInfo($id: String!) {
    oneUser(id: $id) {
      name
      email
    }
    allUsers {
      name
    }
  }
`;

/**
 * Object {
  "allUsers": Array [
    Object {
      "__typename": "User",
      "name": "nicolas",
    },
    Object {
      "__typename": "User",
      "name": "doyoungkim",
    },
    Object {
      "__typename": "User",
      "name": "Sealucky",
    },
    Object {
      "__typename": "User",
      "name": "happydo",
    },
  ],
  "oneUser": Object {
    "__typename": "User",
    "email": "ypd03008@gmail.com",
    "name": "doyoungkim",
  },
} false

 */

const REQUEST__SECRET = gql`
  mutation getrequestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

const CONFIRM__SECRET = gql`
  mutation postConfirmSecret($secret: String!, $email: String!) {
    confirmSecret(secret: $secret, email: $email)
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  //----------------------------------------------------------------
  const { data: OEN_USER_data, loading: OEN_USER_loading } = useQuery(
    OEN_USER,
    {
      variables: { id: "ck5aqmzkyouap0b0933vqydbx" }
    }
  );

  const handle_showOneUser = async () => {
    const {
      oneUser: { name, email }
    } = OEN_USER_data;
    console.log(name, email);

    const { allUsers } = OEN_USER_data;
    allUsers.forEach(e => {
      console.log(e.name);
    });
  };
  //----------------------------------------------------------------
  const [requestSecretMutation] = useMutation(REQUEST__SECRET);

  const handle_requestSecretMutation = async () => {
    const { data: REQUEST__SECRET_data } = await requestSecretMutation({
      variables: { email: "ypd03008@gmail.com" }
    });
    console.log(REQUEST__SECRET_data.requestSecret);
  };
  //----------------------------------------------------------------
  const [CONFIRM__SECRET_Mutation] = useMutation(CONFIRM__SECRET);

  const handle_CONFIRM__SECRET = async () => {
    const { data: CONFIRM__SECRET_data } = await CONFIRM__SECRET_Mutation({
      variables: { secret: "striped apparel", email: "ypd03008@gmail.com" }
    });
    console.log(CONFIRM__SECRET_data);
  };

  return (
    <View>
      <Text>DEV</Text>
      <TouchableOpacity onPress={handle_showOneUser}>
        <Text>OEN_USER_data</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handle_requestSecretMutation}>
        <Text>requestSecretMutation</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handle_CONFIRM__SECRET}>
        <Text>handle_CONFIRM__SECRET</Text>
      </TouchableOpacity>
    </View>
  );
};
