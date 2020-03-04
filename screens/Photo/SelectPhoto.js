import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import styled from "styled-components";

import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import Layout from "../../constants/Layout";
import { ScrollView } from "react-native-gesture-handler";

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();

  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      console.log(assets);
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const askPermission = async () => {
    try {
      const { status, permissions } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );
      if (status === "granted") {
        setHasPermission(true);
        getPhotos();
      }
    } catch (error) {
      setHasPermission(false);
      console.error(error);
    }
  };
  useEffect(() => {
    askPermission();
    return () => {};
  }, []);
  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <>
          <Image
            style={{ width: Layout.screen.width, height: Layout.screen.width }}
            source={{ uri: selected.uri }}
          ></Image>
          <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
            {allPhotos.map(photo => (
              <Image
                key={photo.id}
                style={{
                  width: Layout.screen.width / 3,
                  height: Layout.screen.width / 3
                }}
                source={{ uri: photo.uri }}
              ></Image>
            ))}
          </ScrollView>
        </>
      ) : (
        <Text>So sad:(</Text>
      )}
    </View>
  );
};
