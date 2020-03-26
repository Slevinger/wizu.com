import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import moment from "moment";

export default ({ date }) => {
  const day = moment(date).format("DD");
  const month = moment(date).format("MMM");

  return (
    <View style={styles.container}>
      <Text style={styles.day}>{day}</Text>
      <Text>{month.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    padding: 5,
    alignItems: "center",
    marginTop: -12
  },
  month: {},
  day: {
    fontSize: 30,
    color: "red",
    flex: 1
  }
});
