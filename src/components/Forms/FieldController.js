import React, { useState } from "react";
import { ErrorText } from "../StyledComponents";

import { Controller } from "react-hook-form";

export const FieldController = ({
  errors,
  name,
  label,
  value: initialValue,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(value);
  return (
    <>
      <Controller
        label={label}
        value={initialValue}
        setValue={setValue}
        name={name}
        onChange={args => {
          onChange && onChange(args[0]);
        }}
        {...props}
      />
      {errors[name] && <ErrorText>{`${label} is required.`}</ErrorText>}
    </>
  );
};
