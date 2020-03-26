import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Container } from "../styledComponents";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { NavigationEvents } from "react-navigation";
import { mobxConnect } from "../mobx/mobxConnect";
import Spacer from "../components/Spacer";

const SigninScreen = ({ login, clearErrors }) => {
  return (
    <>
      <Container>
        <Spacer>
          <Text h3>{"WizU LOGIN"}</Text>
        </Spacer>

        <NavigationEvents onDidFocus={clearErrors} />

        <AuthForm mode={"login"} onSubmit={login} submitLabel={"Log In"} />
        <NavLink
          text={"Dont have an account? Sign up here!"}
          redirectKey="Signup"
        />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({});

export default mobxConnect(({ authStore: { login, clearErrors } }) => {
  return {
    login,
    clearErrors
  };
})(SigninScreen);
