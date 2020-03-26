import React, { useState, useEffect } from "react";
import useContacts from "../hooks/useContacts";
import { Text, FlatList } from "react-native";
import { mobxConnect } from "../mobx/mobxConnect";
import { getUsersByPhonesApi } from "../mobx/api/userApis";
import intersectionBy from "lodash/intersectionBy";

const ShareEventScreen = ({ navigation, callApi, friends }) => {
  const contacts = useContacts();
  const [contact, setContacts] = useState([]);
  useEffect(() => {
    (async () => {
      const phoneList = contacts
        .filter(({ phoneNumbers }) => phoneNumbers)
        .map(({ phoneNumbers, name }) =>
          phoneNumbers[0].number.replace(/[\W_\s]+/g, "").replace(/^972/g, "05")
        );
      const api = getUsersByPhonesApi(phoneList);
      const users = await callApi(api);
      console.log(friends);
      const tmp = intersectionBy(friends, phoneList, "_id");
      console.log(tmp);
      setContacts(tmp);
      // setUsers(users);
    })();
  }, [contacts, friends]);
  const event_id = navigation.state.params.event_id;
  return <Text>Share Event {event_id}</Text>;
};
//
export default mobxConnect(
  ({
    apiStore: { callApi },
    authStore: {
      user: { friends }
    },
    userStore: { getUserDetails }
  }) => ({
    callApi,
    friends,
    getUserDetails
  })
)(ShareEventScreen);
