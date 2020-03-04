/**
 *
 * 컴포넌트 한번 랜더링후에는 사진이 안불러와짐.
 */
import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import styled from "styled-components";

import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import Layout from "../../constants/Layout";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();

  const changeSelected = id => {
    setSelected(id);
  };

  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({
        sortBy: MediaLibrary.SortBy.creationTime
      });
      //console.log(assets);
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
          <ScrollView
            contentContainerStyle={{ flexDirection: "column-reverse" }}
          >
            {allPhotos.map(photo => (
              <TouchableOpacity
                key={photo.id}
                onPress={() => {
                  changeSelected(photo);
                }}
              >
                <Image
                  style={{
                    width: Layout.screen.width / 3,
                    height: Layout.screen.width / 3,
                    opacity: photo.id === selected.id ? 0.5 : 1
                  }}
                  source={{ uri: photo.uri }}
                ></Image>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : (
        <Text>So sad:(</Text>
      )}
    </View>
  );
};
