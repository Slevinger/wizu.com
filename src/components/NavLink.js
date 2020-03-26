import React, { useCallback } from "react";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withNavigation } from "react-navigation";

const NavLink = ({ text, redirectKey, onPress, navigation, params }) => {
  const onClick = useCallback(async () => {
    onPress && (await onPress());
    navigation.navigate(redirectKey, params);
  }, [redirectKey, onPress]);

  return (
    <TouchableOpacity onPress={onClick}>
      <Text style={{ color: "blue", alignSelf: "center", fontSize: 16 }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default withNavigation(NavLink);
//
