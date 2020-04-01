import React, { useState, useCallback } from "react";
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native";

const TextInput = React.forwardRef(
  (
    {
      label,
      onChange: onValueChanged,
      value,
      setValue,
      editable = true,
      readOnly = true,
      setReadOnly,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    if (!setReadOnly) {
      [readOnly, setReadOnly] = useState(readOnly);
    }

    // const [value, setValue] = useState(initialValue);

    const onChange = useCallback(
      val => {
        onValueChanged(val);
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
        // onBlur={e => {
        //   console.log("blur1");
        //   setReadOnly(true);
        //   onBlur && onBlur(e);
        // }}
        onFocus={() => {
          onFocus && onFocus(value);
          setReadOnly(false);
        }}
        onEndEditing={args => {
          console.log("done editing name", args.nativeEvent.text);
          onValueChanged(args.nativeEvent.text);
          setReadOnly(true);
          onBlur && onBlur();
        }}
        onBlur={() => {
          // setReadOnly(true);
          onBlur && onBlur();
        }}
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
