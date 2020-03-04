import React, { useState } from "react";
import { Image, ActivityIndicator, Alert } from "react-native";
import useInput from "../../hooks/useInput";
import theme from "../../styles/theme";
import Layout from "../../constants/Layout";
import AuthButton from "../../components/AuthButton";
import styled from "styled-components";
import axios from "axios";

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

export default ({ navigation, route }) => {
  const {
    params: { photo }
  } = route;

  const [loading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const captionInput = useInput("as");
  const locationInput = useInput("as");
  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("All fields are required");
    }

    const formData = new FormData();
    //console.log("--> filename : ", photo);
    formData.append("file", {
      type: "image/jpeg",
      uri: photo.uri,
      name: photo.filename
    });

    const { data } = await axios.post(
      "http://10.0.2.2:4000/api/upload",
      formData,
      {
        headers: {
          "content-type": "multipart/form-data"
        }
      }
    );
    console.log(data);
    setFileUrl(data.path);
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
