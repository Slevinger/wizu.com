import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "react-native-elements";
import { Avatar } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { mobxConnect } from "../../mobx/mobxConnect";
import { withNavigation } from "react-navigation";
import { navigate } from "../../utils/navigationRef";

const UserThumbmnail = ({ user = {}, setMediaSource }) => {
  const { profileImage, username, _id } = user;
  return (
    <View
      key={_id}
      style={{
        padding: 10,
        flexDirection: "column",
        alignItems: "flex-start",
        display: "flex"
      }}
    >
      {username && (
        <>
          <TouchableOpacity
            onPress={() => {
              navigate("profilePreview", { user, setMediaSource });
            }}
          >
            <Avatar
              rounded
              size="large"
              title={username.substr(0, 2).toUpperCase()}
              source={{
                uri: profileImage + "?alt=media"
              }}
            />
          </TouchableOpacity>
          <Text style={{ color: "red", alignSelf: "center" }}>{username}</Text>
        </>
      )}
    </View>
  );
};

const UsersPair = ({ users }) => {
  const [userA, userB] = users;
  return (
    <View>
      <UserThumbmnail user={userA} />
      <UserThumbmnail user={userB} />
    </View>
  );
};

const FriendsComponent = ({ getUserDetails, user, navigation }) => {
  const [listOfFriends, setListOfFriends] = useState([]);
  const { friends } = user;
  console.log(friends.map(({ username }) => username));
  useEffect(() => {
    (async () => {
      const list = await Promise.all(friends.map(_id => getUserDetails(_id)));
      console.log("list", list.map(({ username }) => username));

      const pairs = list.reduce(
        (acc, friend, index) =>
          index % 2 ? acc : [...acc, [friend, list[index + 1]]],
        []
      );
      setListOfFriends(pairs);
    })();
  }, [friends, user]);
  console.log;
  console.log(
    listOfFriends.map(([{ username: userA }, { username: userB }]) => ({
      userA,
      userB
    }))
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 25,
        maringBttom: 200
      }}
    >
      <Text h3>Friends</Text>
      <FlatList
        horizontal
        data={listOfFriends}
        renderItem={({ item }) => {
          return <UsersPair users={item} />;
        }}
        keyExtractor={event => event._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default mobxConnect(
  ({ mediaStore: { setMediaSource }, userStore: { getUserDetails } }) => {
    return {
      getUserDetails,
      setMediaSource
    };
  }
)(withNavigation(FriendsComponent));
