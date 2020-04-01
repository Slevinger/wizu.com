import React from "react";
import { Text, Input } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import Spacer from "../../Spacer";
import { ScrollView } from "react-native-gesture-handler";
import { mobxConnect } from "../../../mobx/mobxConnect";
import * as Colors from "../../../const/Colors";
import TextInput from "../../Forms/TextInput";
import TextComboBox from "../../Forms/TextComboBox";
import { EventNatureList } from "../../../const/Step1Consts";
import EventNatureItem from "./EventNatureItem";

const Step1 = ({
  setEventNature,
  setEventName,
  currentEvent,
  setEventDescription,
  ...props
}) => {
  const { name, event_nature, description } = currentEvent;

  return (
    <ScrollView style={styles.stepContainer}>
      <View style={styles.textContainer}>
        <Text
          style={{ color: Colors.Text, textAlign: "center" }}
        >{`Create an Event\nLets Start By Picking a Name\nAnd Nature Of Event\n You can add a sort description`}</Text>
      </View>
      <Spacer />
      <TextInput
        isDisabled={false}
        textContentType={"name"}
        initialValue={name}
        onChange={name => {
          setEventName(name);
        }}
        name="name"
        label={"Event Name"}
        defaultValue={name}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Spacer />
      <TextComboBox
        label={"Event Nature"}
        onSelect={item => {
          setEventNature(item.label);
        }}
        value={event_nature}
        editable={true}
        data={EventNatureList}
        // isDisabled={false}
        ItemOverlay={EventNatureItem}
      />
      <Spacer />
      <View
        style={{
          borderColor: Colors.Text
        }}
      >
        <Input
          inputContainerStyle={styles.inputContainerStyle}
          value={description}
          style={styles.inputStyle}
          underlineColorAndroid="transparent"
          placeholder="Short Description"
          placeholderTextColor="grey"
          onChangeText={setEventDescription}
          numberOfLines={5}
          multiline={true}
        />
      </View>
      {/* <Input numberOfLines={4} style={{ flexWrap: "wrap" }} /> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  stepContainer: { marginLeft: 50, marginTop: 50, marginRight: 50 },
  inputContainerStyle: {
    borderBottomWidth: 0,
    backgroundColor: "lightgrey"
  },
  inputStyle: {
    height: 150,
    justifyContent: "flex-start"
  },
  textContainer: {
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.1)",
    padding: 10,
    paddingTop: 30,
    paddingBottom: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default mobxConnect(
  ({
    currentEventStore: {
      setEventName,
      setEventNature,
      setEventDescription,
      currentEvent
    }
  }) => ({
    setEventName,
    currentEvent,
    setEventNature,
    setEventDescription
  })
)(Step1);
