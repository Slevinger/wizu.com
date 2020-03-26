import React, { useState, useCallback } from "react";
import { Icon, Button } from "react-native-elements";

const useButtonGroup = _selectedIndex => {
  const [selectedIndex, setSelectedIndex] = useState(_selectedIndex);

  const GroupButton = React.forwardRef(
    (
      {
        selectedColor = "blue",
        backgroundColor = "white",
        onPress,
        index,
        icon: { name: iconName, type: iconType },
        ...props
      },
      ref
    ) => {
      return (
        <Button
          ref={ref}
          {...props}
          onPress={() => {
            setSelectedIndex(index);
            onPress && onPress(index);
          }}
          buttonStyle={{
            backgroundColor:
              selectedIndex == index ? selectedColor : backgroundColor,
            borderRadius: 25
          }}
          icon={
            <GroupButtonIcon index={index} name={iconName} type={iconType} />
          }
        >
          {props.children}
        </Button>
      );
    }
  );

  const GroupButtonIcon = ({ index, ...props }) => (
    <Icon
      size={30}
      style={{
        fontSize: 30,
        alignSelf: "center",
        flex: 1
      }}
      color={selectedIndex == index ? "white" : "blue"}
      {...props}
    />
  );
  return { GroupButton, GroupButtonIcon };
};
export default useButtonGroup;
/*
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
/>*/
