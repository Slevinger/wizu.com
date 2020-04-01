import React, { useState, useRef } from "react";
// import styled from "styled-components";
import { View, ScrollView, TouchableOpacity } from "react-native";

// import { Input, Text, Overlay } from "react-native-elements";
import TextInput from "./TextInput";
import { FlatList } from "react-native-gesture-handler";

export default ({
  label,
  onTextValueChanged,
  onSelect,
  value,
  editable = true,
  numberOfPossibilities = 10,
  data,
  ItemOverlay
}) => {
  const [showList, setShowList] = useState(false);
  const [textInput, setTextInput] = useState(value);
  const [readOnly, setReadOnly] = useState(true);
  const input = useRef();

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        ref={input}
        label={label}
        setValue={setTextInput}
        setReadOnly={setReadOnly}
        onFocus={() => {
          setShowList(true);
        }}
        onChange={text => {
          setTextInput(text);
          onTextValueChanged && onTextValueChanged(text);
        }}
        value={textInput}
        editable={editable}
        readOnly={readOnly}
      />
      {showList && (
        <ScrollView style={{ flex: 1, padding: 10 }}>
          {data.slice(0, numberOfPossibilities).map(item => (
            <TouchableOpacity
              onPress={() => {
                setShowList(false);
                setTextInput(item.label);
                onSelect && onSelect(item);
                input.current.blur();
                setReadOnly(true);
              }}
            >
              <ItemOverlay {...item} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
