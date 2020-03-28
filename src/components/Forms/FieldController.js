import React from "react";
import { ErrorText } from "../StyledComponents";

import { Controller } from "react-hook-form";

export const FieldController = ({ errors, name, label, ...props }) => {
  return (
    <>
      <Controller label={label} name={name} {...props} />
      {errors[name] && <ErrorText>{`${label} is required.`}</ErrorText>}
    </>
  );
};
