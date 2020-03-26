import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Icon } from "react-native-elements";
import { mobxConnect } from "../mobx/mobxConnect";
import { FlatList } from "react-native-gesture-handler";
import Noatification from "../components/Feed/Noatification";
import { toJS } from "mobx";

const filterRsvps = correspondence => {
  const { correspondence_type, trigger_user_id, user_id } = correspondence;
  console.log(
    `correspondence_type:(${correspondence_type}) !== "RSVP" => ${correspondence_type !==
      "RSVP"} || trigger_user_id:(${trigger_user_id}) !== user_id:(${user_id}) => ${trigger_user_id !==
      user_id}`
  );
  return correspondence_type !== "RSVP" || trigger_user_id !== user_id;
};

const NotificationsScreenComponent = ({ user, navigation }) => {
  const { correspondences, email } = user;
  const array = Object.values(correspondences).filter(filterRsvps);
  return (
    <>
      <Text style={{ fontSize: 48 }}>Noatifications </Text>
      <FlatList
        data={array.sort((a, b) => b.date - a.date > 0)}
        keyExtractor={({ _id }) => _id}
        vertical
        renderItem={({ item }) => {
          return <Noatification user={user} {...item} />;
        }}
        keyExtractor={item => item._id}
      />
    </>
  );
};

const styled = StyleSheet.create({});

const notificationsMobx = mobxConnect(({ authStore }) => ({
  user: authStore.user
}))(NotificationsScreenComponent);

notificationsMobx.navigationOptions = {
  headerMode: "none",
  title: "Notifications",
  tabBarIcon: <Icon name="assignment" type="material" />
};

export default notificationsMobx;
