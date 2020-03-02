import React, { useState } from "react";
import { Image, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../styles/theme";

//API
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import Layout from "../constants/Layout";

const Container = styled.View`
  margin-bottom: 40px;
`;
const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;
const Bold = styled.Text`
  font-weight: 500;
`;
const Location = styled.Text`
  font-size: 12px;
`;
const IconsContainer = styled.View`
  padding: 10px;
  flex-direction: row;
`;
const IconContainer = styled.View`
  margin-right: 10px;
`;
const InfoContainer = styled.View`
  padding: 10px;
`;
const Caption = styled.Text`
  margin: 5px 0px;
`;
const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;
const Post = ({
  id,
  user,
  location,
  files = [],
  likeCount: likeCountProp,
  caption,
  comments = [],
  isLiked: isLikedProp
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [toggleLikeMutaton] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id
    }
  });
  const handleLikeAPI = async () => {
    console.log("handleLikeAPI");
    await toggleLikeMutaton();
  };
  const handleLike = async () => {
    if (isLiked === true) {
      setLikeCount(l => l - 1);
    } else {
      setLikeCount(l => l + 1);
    }
    setIsLiked(p => !p);
    handleLikeAPI();
  };

  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable>
          <HeaderUserContainer>
            <Bold>{user.name}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper
        style={{ height: Layout.window.height / 2.5 }}
        paginationStyle={{ position: "absolute", bottom: -25 }}
        dotStyle={{ width: 5, height: 5 }}
      >
        {files.map(file => (
          <Image
            key={file.id}
            source={{ uri: file.url }}
            style={{
              width: Layout.window.width,
              height: Layout.window.width
            }}
          />
        ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <Touchable onPress={handleLike}>
            <IconContainer>
              <Ionicons
                size={28}
                name={
                  Platform.OS === "ios"
                    ? isLiked
                      ? "ios-heart"
                      : "ios-heart-empty"
                    : isLiked
                    ? "md-heart"
                    : "md-heart-empty"
                }
                color={isLiked ? theme.redColor : theme.blackColor}
              />
            </IconContainer>
          </Touchable>
          <Touchable>
            <IconContainer>
              <Ionicons
                color={theme.blackColor}
                size={24}
                name={Platform.OS === "ios" ? "ios-text" : "md-text"}
              />
            </IconContainer>
          </Touchable>
        </IconsContainer>
        <Touchable>
          <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Bold>
        </Touchable>
        <Caption>
          <Bold>{user.name}</Bold> {caption}
        </Caption>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

export default Post;

export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;
