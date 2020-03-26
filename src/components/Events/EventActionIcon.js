import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Icon } from "react-native-elements";
import styled from "styled-components";

const StyledText = styled(Text)`
  align-self: center;
  color: ${({ selected }) => {
    return selected ? "blue" : "black";
  }};
`;

export default ({ text, name, type = "material", selected, onClick }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onClick && onClick();
      }}
    >
      <View style={styles.container}>
        <Icon
          style={styles.icon}
          name={name}
          size={30}
          type={type}
          color={selected ? "blue" : "black"}
        />
        {/* <MaterialIcons style={styles.icon} name={name} /> */}
        <StyledText
          selected={selected}
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.text}
        >
          {text}
        </StyledText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 60,
    paddingBottom: 5
  },
  text: { alignSelf: "center" },
  icon: {
    fontSize: 30,
    alignSelf: "center",
    flex: 1
  }
});
