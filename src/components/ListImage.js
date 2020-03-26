import React, { useState, useCallback } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ImageInListContainer } from "./StyledComponents";
import ImageLoad from "react-native-image-placeholder";
import { mobxConnect } from "../mobx/mobxConnect";
import { ImageBackground, StyleSheet } from "react-native";
import EmptyImage from "../../assets/empty-image.png";
const ListImage = ({ image_url = "", setMediaSource }) => {
  const source = image_url
    ? {
        uri: image_url.replace("?alt=media", "") + "?alt=media"
      }
    : EmptyImage;
  return (
    <TouchableOpacity
      onPress={() => {
        setMediaSource(image_url);
      }}
    >
      <ImageInListContainer>
        <ImageBackground
          source={source}
          style={styles.backgroundImage}
          resizeMethod="auto"
          resizeMode="cover"
        />
      </ImageInListContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  }
});
export default mobxConnect(({ mediaStore }) => ({
  setMediaSource: mediaStore.setMediaSource
}))(ListImage);
