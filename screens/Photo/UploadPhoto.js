import React, { useState, Component } from "react";
import { Image, ActivityIndicator, Alert } from "react-native";
import useInput from "../../hooks/useInput";
import theme from "../../styles/theme";
import Layout from "../../constants/Layout";
import AuthButton from "../../components/AuthButton";
import styled from "styled-components";
import axios from "axios";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FEED_QUERY } from "../Main/Home";

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
      files {
        id
        url
      }
    }
  }
`;

export default ({ navigation, route }) => {
  const {
    params: { photo }
  } = route;

  const [loading, setIsLoading] = useState(false);
  const captionInput = useInput("");
  const locationInput = useInput("");

  const [UPLOAD_mutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: FEED_QUERY }]
  });

  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }
    //1. 파일업로드 -> S3

    const formData = new FormData();
    //console.log("--> filename : ", photo);
    formData.append("file", {
      type: "image/jpeg",
      uri: photo.uri,
      name: photo.filename
    });
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "http://10.0.2.2:4000/api/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data"
          }
        }
      );
      //2. file경로,caption,location -> GQL
      // FB) setFileUrl 하고나면 바뀐 변수는 다음 랜더링때 가능!!
      // setFileUrl 하고 다음 랜더링을 기다리지 말고 -> 바로 보내버리자.
      console.log("-->data", data);
      const {
        data: { upload }
      } = await UPLOAD_mutation({
        variables: {
          caption: captionInput.value,
          files: [data.location],
          location: captionInput.value
        }
      });
      console.log("--> upload", upload);
      navigation.navigate("HomeTab");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
      <Container>
        <Image
          source={{ uri: photo.uri }}
          style={{ height: 80, width: 80, marginRight: 30 }}
        />
        <Form>
          <STextInput
            onChangeText={captionInput.onChangeText}
            value={captionInput.value}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={theme.darkGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChangeText}
            value={locationInput.value}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={theme.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>Upload </Text>
            )}
          </Button>
        </Form>
      </Container>
    </View>
  );
};

const View = styled.View`
  flex: 1;
`;

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

const Form = styled.View`
  justify-content: flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${theme.lightGreyColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  width: ${Layout.window.width - 180}px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

/**
 * 안드로이드의 파일구조
 filename :  Object {
  "albumId": "540528482",
  "creationTime": 0,
  "duration": 0,
  "filename": "db1f273a13a1a031ec9c611eaecda393.png",
  "height": 2000,
  "id": "25",
  "mediaType": "photo",
  "modificationTime": 1583297411000,
  "uri": "file:///storage/emulated/0/Download/db1f273a13a1a031ec9c611eaecda393.png",
  "width": 1983,
}
 */
