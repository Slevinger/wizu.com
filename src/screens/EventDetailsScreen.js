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
  setLocation,
  setMediaSource,
  navigation
}) => {
  if (!currentEvent) {
    navigation.navigate("eventsFlow");
  }
  const { _id, image_url, location } = currentEvent;
  const { openImagePickerAsync, imageUrl } = useImagePicker(
    updateImage,
    _id,
    image_url
  );
  const source = image_url
    ? { uri: image_url.replace("?alt=media") + "alt-media" }
    : EmptyImage;

  const { locationSearchBar, addressDropdownList } = useLocationPicker({
    onFocus(e) {
      console.log(e);
    },
    onValueSet(res) {
      setLocation(res.address);
    },
    currentLocation: location
  });
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
  ({ eventsStore, mediaStore: { setMediaSource } }) => {
    return {
      currentEvent: eventsStore.currentEvent,
      setLocation: eventsStore.setLocation,
      setCurrentEvent: eventsStore.setCurrentEvent,
      updateImage: eventsStore.updateImage,
      commitEventChanges: eventsStore.commitEventChanges,
      setMediaSource
    };
  }
)(EventDetailsScreen);
