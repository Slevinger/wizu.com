import React, { useState, useCallback } from "react";
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native";

const TextInput = React.forwardRef(
  (
    { label, onValueChanged, value: initialValue, editable = true, ...props },
    ref
  ) => {
    const [readOnly, setReadOnly] = useState(true);
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback(
      val => {
        setValue(val);
        onValueChanged && onValueChanged(val);
      },
      [onValueChanged]
    );

    const input = (
      <Input
        ref={ref}
        disabled={readOnly}
        editable={editable}
        inputStyle={readOnly ? { backgroundColor: "lightgrey" } : {}}
        labelStyle={readOnly ? { color: "lightgrey" } : {}}
        onBlur={() => setReadOnly(true)}
        onFocus={() => setReadOnly(false)}
        autoCorrect={false}
        value={value}
        onChangeText={onChange}
        label={label}
        {...props}
      />
    );
    if (!readOnly) {
      return input;
    }
    return (
      <TouchableOpacity onPress={() => editable && setReadOnly(false)}>
        {input}
      </TouchableOpacity>
    );
  }
);

export default TextInput;
