import React from "react";
import { Text, Image, Icon } from "react-native-elements";
import { View } from "react-native";

export default ({ label, icon = {} }) => {
  const $Icon =
    icon && !icon.type ? (
      <View style={{ flex: 1 }}>
        <Image source={icon} style={{ height: 40 }} resizeMode="contain" />
      </View>
    ) : (
      icon.type && (
        <View style={{ flex: 1 }}>
          <Icon type={icon.type} size={40} name={icon.name} />
        </View>
      )
    );

  return (
    <View
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: "rgba(150,150,150,0.3)",
        // justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "rgba(250,250,250,0.7)"
      }}
    >
      <Text h5 style={{ padding: 5, flex: 1 }}>
        {label}
      </Text>

      {$Icon}
    </View>
  );
};
