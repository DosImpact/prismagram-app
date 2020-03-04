import React, { useState, useEffect } from "react";
import { Image, Platform } from "react-native";
import styled from "styled-components";

import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

import Loader from "../../components/Loader";
import Layout from "../../constants/Layout";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../styles/theme";

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

export default props => {
  const {
    navigation: { navigate }
  } = props;

  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const askPermission = async () => {
    try {
      const { status, permissions } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL,
        Permissions.CAMERA
      );
      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (error) {
      setHasPermission(false);
      console.error(error);
    } finally {
      setLoading(false);
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
        <Camera
          style={{
            width: Layout.screen.width,
            height: Layout.screen.height / 1.5
          }}
          type={type}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                alignSelf: "flex-end",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: 20
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Ionicons
                size={28}
                name={
                  Platform.OS === "ios"
                    ? "ios-reverse-camera"
                    : "md-reverse-camera"
                }
                color={theme.lightGreyColor}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : null}
    </View>
  );
};
/**
 *       <TouchableOpacity
        onPress={() => {
          navigate("UploadPhoto");
        }}
      >
        <Text>TakePhoto.js</Text>
      </TouchableOpacity>
 */
