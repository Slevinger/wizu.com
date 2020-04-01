import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { mobxConnect } from "../mobx/mobxConnect";
import { SafeAreaView } from "react-native-safe-area-context";

const ErrorDialog = mobxConnect(({ statsStore }) => {
  return {
    errors: statsStore.errors,
    clearError: statsStore.clearError
  };
})(({ errors, clearError }) => {
  return (
    errors.length > 0 && (
      <View style={styles.dialog}>
        {errors.map((message, index) => (
          <TouchableOpacity
            key={message + index}
            onPress={() => clearError(index)}
          >
            <Text style={styles.errorMessages}>{message}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  );
});

const ErrorHandler = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        display: "flex"
      }}
    >
      <ErrorDialog />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorMessages: {
    fontSize: 16,
    padding: 10,
    marginTop: 15,
    justifyContent: "center",
    color: "white",
    backgroundColor: "rgba(255,0,0,0.7)"
  },
  dialog: {
    position: "absolute",
    marginTop: 25,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flex: 1
  }
});

// export default ErrorHandler;

export default ErrorHandler;
