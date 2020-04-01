import React from "react";
import { View, Share } from "react-native";
import { Text } from "react-native-elements";
import { mobxConnect } from "../../mobx/mobxConnect";
import { toJS } from "mobx";
import { navigate } from "../../utils/navigationRef";
import EventActionIcon from "../../components/Events/EventActionIcon";
import EventDate from "../../components/Events/EventDate";

const shareOptions = {
  title: "Hey have you heared of wizu?",
  // message: "Message to share", // Note that according to the documentation at least one of "message" or "url" fields is required
  url: "www.example.com",
  subject: "Wiz U"
};

const EventActionBar = ({
  event: { _id, name, date, answer, description },
  setSeen,
  setInterested,
  approveInvite
}) => {
  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              paddingRight: 5,

              marginTop: -7
            }}
          >
            {name}
          </Text>
          <Text style={{ fontWeight: "100", color: "gray" }}>
            {description}
          </Text>
        </View>
        <EventDate date={date} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          borderBottomWidth: 1,
          borderColor: "grey"
        }}
      >
        <EventActionIcon
          text={"Interested"}
          selected={answer === "interested"}
          onClick={answer === "interested" ? setSeen : setInterested}
          name="star-border"
        />
        <EventActionIcon
          text={"Going"}
          type="ionicon"
          name="md-checkmark-circle-outline"
          selected={answer === "confirm"}
          onClick={answer === "confirm" ? setSeen : approveInvite}
        />
        <EventActionIcon
          onClick={() => {
            navigate("ShareEvent", { event_id: _id });
          }}
          text={"Share"}
          type="ionicon"
          name="md-share"
        />
        <EventActionIcon text={"More"} name="more-horiz" />
      </View>
    </>
  );
};

export default mobxConnect(
  ({
    currentEventStore: { currentEvent, setSeen, setInterested, approveInvite }
  }) => {
    return { event: currentEvent, setSeen, setInterested, approveInvite };
  }
)(EventActionBar);
