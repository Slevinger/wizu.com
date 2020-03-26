import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  View
} from "react-native";
import { Icon } from "react-native-elements";
import { mobxConnect } from "../mobx/mobxConnect";
import Friends from "../components/Profile/Friends";
import HeaderImage from "../components/HeaderImage";
import useImagePicker from "../hooks/useImagePicker";
import TextInput from "../components/Forms/TextInput";
import Spacer from "../components/Spacer";
import LoadingScreen from "../screens/LoadingScreen";

export const ProfileScreen = ({
  setMediaSource,
  navigation,
  logout,
  updateProfileImage,
  user
}) => {
  const currentUser = user || navigation.state.params.user;

  // setMediaSource = setMediaSource || navigation.state.params.setMediaSource;

  const { username, phone, profileImage, email, _id } = currentUser;

  const { openImagePickerAsync, imageUrl } = useImagePicker(
    updateProfileImage,
    _id,
    profileImage
  );
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          height: "100%",
          position: "relative",
          display: "flex",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0
        }}
      >
        <TouchableOpacity
          onLongPress={openImagePickerAsync}
          onPress={() => {
            setMediaSource(profileImage);
          }}
        >
          <HeaderImage
            uri={profileImage}
            // useBlur
          />
        </TouchableOpacity>
        <Spacer>
          <TextInput editable={!!user} label="Username" value={username} />
        </Spacer>

        <Spacer>
          <TextInput editable={!!user} label="Email" value={email} />
        </Spacer>
        <Spacer>
          <TextInput
            editable={!!user}
            label="Phone Number"
            keyboardType={"number-pad"}
            value={phone}
          />
        </Spacer>

        <Friends user={currentUser} />
      </ScrollView>
      {!!user && (
        <Button
          title={"logout"}
          onPress={() => {
            logout();
            navigation.navigate("loginFlow");
          }}
        />
      )}
    </View>
  );
};

const styled = StyleSheet.create({});

// export default ProfileScreen;

const mobxProfileScreen = mobxConnect(
  ({
    authStore: { logout, user },
    mediaStore: { setMediaSource },
    userStore: { updateProfileImage }
  }) => {
    return {
      logout,
      user,
      setMediaSource,
      updateProfileImage
    };
  }
)(ProfileScreen);

mobxProfileScreen.navigationOptions = {
  title: "Profile",
  tabBarIcon: <Icon name="person" type="material" />
};

export default mobxProfileScreen;
