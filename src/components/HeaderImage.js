import React from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import EmptyImage from "../../assets/empty-image.png";
export default ({ uri, resizeMode = "cover", borderRadius = 0, useBlur }) => {
  const source = uri
    ? {
        uri: uri.replace("?alt=media", "") + "?alt=media"
      }
    : EmptyImage;
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={source || EmptyImage}
      resizeMode={resizeMode}
      borderRadius={borderRadius}
      blurRadius={useBlur ? 3 : 0}
    >
      <View
        style={{
          height: 200,
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        {useBlur && (
          <View style={{ height: 100 }}>
            <ImageBackground
              style={styles.insideImage}
              source={source}
              borderRadius={borderRadius}
              blurRadius={0}
            ></ImageBackground>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: { alignSelf: "center" },
  icon: {
    fontSize: 30,
    alignSelf: "center",
    flex: 1
  },
  insideImage: {
    flex: 1,
    width: null,
    height: null
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  }
});
