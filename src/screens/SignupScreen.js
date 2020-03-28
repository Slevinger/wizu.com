import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  TouchableOpacity
} from "react-native";
import { Input, Text } from "react-native-elements";
import { Container } from "../styledComponents";

import AuthForm from "../components/Forms/AuthForm";
import NavLink from "../components/NavLink";
import Spacer from "../components/Spacer";
import { NavigationEvents } from "react-navigation";
import { mobxConnect } from "../mobx/mobxConnect";
import { MaterialIcons } from "@expo/vector-icons";
import { ErrorText } from "../components/StyledComponents";

const SignupScreen = ({ signup, clearErrors }) => {
  return (
    <>
      <Spacer>
        <Text h3>{"Sign Up To WizU"}</Text>
      </Spacer>
      <Container>
        <NavigationEvents onDidFocus={clearErrors} />

        <Spacer />
        <ScrollView>
          <AuthForm onSubmit={signup} submitLabel={"Sign Up"} />
        </ScrollView>
        <NavLink
          text={"Already have an account? Sign in instead"}
          redirectKey="Signin"
        />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({});

export default mobxConnect(({ authStore: { signup, clearErrors } }) => {
  return {
    signup,
    clearErrors
  };
})(SignupScreen);
