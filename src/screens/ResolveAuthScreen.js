import React from "react";
import { useEffect } from "react";
import { mobxConnect } from "../mobx/mobxConnect";
import { ActivityIndicator } from "react-native";

const ResolveAuthScreen = ({ tryLocalSignin }) => {
  useEffect(() => {
    tryLocalSignin();
  }, []);
  return <ActivityIndicator size="large" />;
};

export default mobxConnect(({ authStore: { tryLocalSignin } }) => {
  return {
    tryLocalSignin
  };
})(ResolveAuthScreen);
