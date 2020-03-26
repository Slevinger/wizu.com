import React, { useState } from "react";
import { Text, Button, Icon } from "react-native-elements";
import { View } from "react-native";
import { distanceFromTodayText } from "../../utils/timeDescriptor";
import useButtonGroup from "../../hooks/useButtonGroup";
import ListImage from "../ListImage";
import capitalize from "lodash/capitalize";
import NavLink from "../NavLink";
import Spacer from "../Spacer";
import { ButtonGroupContainer } from "./StyledFeedComponents";

export default ({
  otherUser,
  user,
  trigger_user_id,
  timeStamp,
  answer,
  confirmFriendRequest,
  ignoreFriendRequest
}) => {
  const { GroupButton } = useButtonGroup(
    answer && (answer === "confirm" ? 1 : 0)
  );

  return (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            alignItems: "flex-start",
            flex: 1
          }}
        >
          {otherUser._id.toString() !== trigger_user_id ? (
            <>
              <Text>{`You have sent a Friend Request to `}</Text>
              <NavLink
                text={otherUser.username}
                params={{ user: otherUser }}
                redirectKey="profilePreview"
              />
            </>
          ) : (
            <>
              <NavLink
                text={otherUser.username}
                params={{ user: otherUser }}
                redirectKey="profilePreview"
              />
              <Text>{`sent you a Friend Req`}</Text>
            </>
          )}

          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "lightgrey" }}>
              {capitalize(distanceFromTodayText(timeStamp))}
            </Text>
          </View>
        </View>
        <ListImage image_url={otherUser.profileImage} />
        <Spacer size={3} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          borderColor: "red"
        }}
      >
        <View style={{ flex: 1 }}></View>
        <ButtonGroupContainer>
          <GroupButton
            raised
            index={0}
            onPress={() => {
              ignoreFriendRequest(otherUser._id);
            }}
            icon={{ name: "thumbs-down", type: "feather" }}
          />
          <Spacer size={3} />
          <GroupButton
            raised
            index={1}
            onPress={() => {
              confirmFriendRequest(otherUser._id);
            }}
            icon={{ name: "thumbs-up", type: "feather" }}
          />
        </ButtonGroupContainer>
      </View>
    </View>
  );
};
