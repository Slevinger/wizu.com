import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { mobxConnect } from "../../mobx/mobxConnect";
import { toJS } from "mobx";
import { Event } from "./EventListItem";

const EventsList = ({ events, navigation, replay }) => {
  return (
    <FlatList
      vertical
      data={events.filter(Boolean).slice()}
      renderItem={({ item }) => {
        return <Event {...item} navigation={navigation} />;
      }}
      keyExtractor={event => event._id}
    />
  );
};
export default EventsList;
