import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import PropTypes from "prop-types";
import Layout from "../constants/Layout";

const SquarePhoto = ({ navigation, files = [], id }) => {
  // console.log("--> data incoming ->", id, files);
  return (
    <TouchableOpacity
      style={{
        width: Layout.window.width / 3,
        height: Layout.window.width / 3
      }}
    >
      <Image
        source={{ uri: files[0].url }}
        style={{
          width: Layout.window.width / 3,
          height: Layout.window.width / 3
        }}
      />
    </TouchableOpacity>
  );
};

SquarePhoto.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  id: PropTypes.string.isRequired
};
export default SquarePhoto;
