import React, { useState } from "react";
import { View } from "react-native";
import { Button, Icon } from "react-native-elements";

export default ({ buttons, selectedIndex, buttonStyle }) => {
  const [_selectedIndex, set_selectedIndex] = useState(selectedIndex);
  return (
    <View>
      {buttons.map(button => {
        return (
          <Button
            buttonStyle={{
              backgroundColor: _selectedIndex == 0 ? "blue" : "white",
              borderRadius: 25
            }}
            raised
            onPress={() => {
              set_selectedIndex(0);
              ignoreFriendRequest(otherUser._id);
            }}
            icon={
              <Icon
                size={30}
                style={{
                  fontSize: 30,
                  alignSelf: "center",
                  flex: 1
                }}
                color={_selectedIndex == 0 ? "white" : "blue"}
                name="thumbs-down"
                type="feather"
              />
            }
          />
        );
      })}
    </View>
  );
};
