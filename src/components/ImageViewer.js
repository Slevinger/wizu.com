import React from "react";
import { Modal, View, Text } from "react-native";
import ImageView from "react-native-image-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { mobxConnect } from "../mobx/mobxConnect";
import { navigate } from "../utils/navigationRef";
const ImageViewer = ({ mediaSource, hideMedia }) => {
  if (!mediaSource) {
    return null;
  }

  return (
    <TouchableOpacity onPress={hideMedia}>
      <ImageView
        images={[
          {
            source: mediaSource,
            width: 960,
            height: 720
          }
        ]}
        imageIndex={0}
        isVisible={true}
        onClose={hideMedia}
      />
    </TouchableOpacity>
  );
};

export default mobxConnect(({ mediaStore }) => ({
  hideMedia: mediaStore.hideMedia,
  mediaSource: mediaStore.mediaSource
}))(ImageViewer);
