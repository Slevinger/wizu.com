import React, { useState } from "react";
import { Text, Button, Input } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { ErrorText } from "../components/StyledComponents";
import Spacer from "./Spacer";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

import { useForm, Controller } from "react-hook-form";

const FieldController = ({ errors, name, label, ...props }) => {
  return (
    <>
      <Controller label={label} name={name} {...props} />
      {errors[name] && <ErrorText>{`${label} is required.`}</ErrorText>}
    </>
  );
};

const AuthForm = ({ submitLabel, onSubmit, onBlur, mode = "signup" }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const isSignUp = mode === "signup";
  const { handleSubmit, watch, errors, control } = useForm();
  const _onSubmit = data => {
    onSubmit(data);
  };

  return (
    <>
      <NavigationEvents onWillBlur={onBlur} />
      {isSignUp && (
        <>
          <FieldController
            as={Input}
            control={control}
            textContentType={"telephoneNumber"}
            keyboardType={"number-pad"}
            name="phone"
            label={"Phone Number"}
            onChange={args => args[0].nativeEvent.text}
            rules={{ required: true }}
            defaultValue=""
            autoCorrect={false}
            autoCapitalize="none"
            errors={errors}
          />
          <Spacer />
          <FieldController
            as={Input}
            control={control}
            name="email"
            label={"Email"}
            onChange={args => args[0].nativeEvent.text}
            rules={{ required: true }}
            defaultValue=""
            autoCorrect={false}
            autoCapitalize="none"
            errors={errors}
          />
          <Spacer />
        </>
      )}

      <FieldController
        as={Input}
        control={control}
        name="username"
        label={"Username"}
        onChange={args => args[0].nativeEvent.text}
        rules={{ required: true }}
        defaultValue=""
        autoCorrect={false}
        autoCapitalize="none"
        errors={errors}
      />

      <Spacer />

      <FieldController
        as={Input}
        control={control}
        errors={errors}
        name="password"
        onChange={args => args[0].nativeEvent.text}
        rules={{ required: true }}
        defaultValue={""}
        autoCorrect={false}
        label={"Password"}
        secureTextEntry={hidePassword}
        autoCorrect={false}
        autoCapitalize="none"
        rightIcon={
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPressIn={() => {
              setHidePassword(false);
            }}
            onPressOut={() => {
              setHidePassword(true);
            }}
          >
            <MaterialIcons style={{ fontSize: 20 }} name="visibility" />
          </TouchableOpacity>
        }
      />

      <Spacer />
      <Spacer>
        <Button title={submitLabel} onPress={handleSubmit(_onSubmit)} />
      </Spacer>
    </>
  );
};
const styles = StyleSheet.create({});

export default AuthForm;
