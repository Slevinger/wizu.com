import { View, FlatList, Image } from "react-native";
import React, { useEffect, useCallback, useState } from "react";
import { mobxConnect } from "../mobx/mobxConnect";
import { toJS } from "mobx";
import EventsList from "../components/Events/EventsList";
import { Icon, Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
const EventsScreen = mobxConnect(({ authStore, eventsStore }) => ({
  user: authStore.user,
  events: eventsStore.events,
  setCurrentEvent: eventsStore.setCurrentEvent,
  getEvents: eventsStore.getEvents
}))(({ getEvents, events = {}, navigation }) => {
  const sortedReplays = ["confirm", "interested", "not seen yet", "seen"];
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Text h2 style={{ flex: 1, color: "red" }}>
          Events
        </Text>
        <View style={{ margin: 10 }}>
          <TouchableOpacity
            onPress={() => {
              console.log(navigation);
              navigation.navigate("EventCreate");
              console.log("click");
            }}
          >
            <Icon size={40} name="add-circle" color="red" type="material" />
          </TouchableOpacity>
        </View>
      </View>
      {sortedReplays
        .filter(
          replay => events[replay] && events[replay].filter(Boolean).length > 0
        )
        .map(replay => {
          console.log(replay);
          return (
            <View key={replay} style={{ borderWidth: 0 }}>
              <Text>{replay}</Text>
              <EventsList
                key={replay}
                events={events[replay]}
                replay={replay}
                navigation={navigation}
              />
            </View>
          );
        })}
    </>
  );
});

EventsScreen.navigationOptions = {
  title: "events",
  headerMode: "float"
};

export default EventsScreen;
