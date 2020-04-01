import React, { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
import { mobxConnect } from "../../mobx/mobxConnect";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  StyledEventItem,
  FlexBox,
  EventDate,
  EventDetails,
  Horizontal
} from "../StyledComponents";
import moment from "moment";
import useImagePicker from "../../hooks/useImagePicker";
import ListImage from "../ListImage";
// {
// 	//_id:null,
// 	name: null,
// 		description: null,
// 	date: null,
// 	users: [],
// 	location: null,
// 	event_nature: null,
// 	todo_lists: [],
// 	stickey_notes: [],
// 	administrators: [],
// 	suervyes: [],
// 	budget: null,
// 	timestamp: new Date().getTime()
// }

export const Event = mobxConnect(
  ({ authStore, eventsStore, currentEventStore }) => ({
    username: authStore.user.username,
    updateImage: currentEventStore.updateImage,
    setEventSeen: currentEventStore.setEventSeen,
    setCurrentEvent: eventsStore.setCurrentEvent
  })
)(props => {
  const {
    name,
    date,
    image_url,
    location,
    _id: event_id,
    setCurrentEvent,
    setEventSeen,
    updateImage,
    navigation
  } = props;

  const { navigate } = navigation;
  // const { openImagePickerAsync } = useImagePicker(updateImage);
  // console.log(image_url);
  return (
    <StyledEventItem key={event_id}>
      <ListImage image_url={image_url} />
      <TouchableOpacity
        onPress={() => {
          setCurrentEvent(event_id);
          navigate("eventDetails");
          setEventSeen();
        }}
      >
        <FlexBox>
          <EventDate>{moment(date).format("dddd-MMM-YYYY hh:mm A")}</EventDate>
          <Text style={{ fontWeight: "bold" }}>{name}</Text>
          <EventDetails style={{ marginTop: 10 }}>
            <Text>{location}</Text>
            <Horizontal>
              <Icon name="users" />
            </Horizontal>
          </EventDetails>
        </FlexBox>
      </TouchableOpacity>
    </StyledEventItem>
  );
});
