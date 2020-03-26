import React from "react";
import { Text } from "react-native-elements";
import NavLink from "../../components/NavLink";
import ListImage from "../ListImage";
import Spacer from "../Spacer";
import { View } from "react-native";
import { mobxConnect } from "../../mobx/mobxConnect";
import { distanceFromTodayText } from "../../utils/timeDescriptor";
import moment from "moment";
import capitalize from "lodash/capitalize";

const EventInvite = ({ otherUser, event, setCurrentEvent }) => {
  const { name, _id, date, image_url } = event;
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          alignItems: "flex-start",
          flex: 1
        }}
      >
        <Text>{`You were invited by, `}</Text>
        <View style={{ flexDirection: "row" }}>
          <NavLink
            text={otherUser.username}
            params={{ user: otherUser }}
            redirectKey="profilePreview"
          />
          <Text>{` to the event `}</Text>
        </View>
        <NavLink
          redirectKey={"eventDetails"}
          onPress={async () => await setCurrentEvent(_id)}
          text={name}
        />
        <Text style={{ color: "lightgrey" }}>
          {capitalize(distanceFromTodayText(moment(date)))}
        </Text>
      </View>
      <ListImage image_url={image_url} />
      <Spacer size={3} />
    </View>
  );
};

export default mobxConnect(({ authStore, eventsStore }) => ({
  setCurrentEvent: eventsStore.setCurrentEvent
}))(EventInvite);
