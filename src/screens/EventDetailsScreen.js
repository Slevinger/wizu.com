import { View, Text, TouchableOpacity, Button } from "react-native";
import React, { useEffect } from "react";
import { mobxConnect } from "../mobx/mobxConnect";
import { useLocationPicker } from "../hooks/useLocationPicker";
import ImageLoad from "react-native-image-placeholder";
import useImagePicker from "../hooks/useImagePicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import EventActionsBar from "../components/Events/EventActionsBar";
import HeaderImage from "../components/HeaderImage";
import EmptyImage from "../../assets/empty-image.png";

const EventDetailsScreen = ({
  currentEvent,
  updateImage,
  setMediaSource,
  reset,
  navigation
}) => {
  if (!currentEvent) {
    navigation.navigate("eventsFlow");
  }
  const { _id, image_url } = currentEvent;
  const { openImagePickerAsync, imageUrl } = useImagePicker(
    updateImage,
    _id,
    image_url
  );
  useEffect(() => reset(), []);
  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          height: "100%",
          position: "relative",
          display: "flex",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0
        }}
      >
        <TouchableOpacity
          onLongPress={openImagePickerAsync}
          onPress={() => {
            setMediaSource(imageUrl);
          }}
        >
          <HeaderImage uri={imageUrl} useBlur />
        </TouchableOpacity>
        <View style={{ flex: 1 }} enabled>
          <EventActionsBar />
        </View>
      </ScrollView>
    </>
  );
};

export default mobxConnect(
  ({
    currentEventStore: { currentEvent, reset, updateImage },
    mediaStore: { setMediaSource }
  }) => {
    return { currentEvent, reset, updateImage, setMediaSource };
  }
)(EventDetailsScreen);
