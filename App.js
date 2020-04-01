import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import EventDetailsScreen from "./src/screens/EventDetailsScreen";
import EventsScreen from "./src/screens/EventsScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import ShareEventScreen from "./src/screens/ShareEventScreen";
import CreateEventWizard from "./src/components/Events/EventWizard/CreateEventWizard";
import MainProfileScreen, { ProfileScreen } from "./src/screens/ProfileScreen";
import { Icon } from "react-native-elements";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { setNavigator } from "./src/utils/navigationRef";
import ErrorHandler from "./src/components/ErrorHandler";
import { Provider as StoresProvider } from "./src/mobx/Provider";
import { createStores } from "./src/mobx/createStores";
import ImageViewer from "./src/components/ImageViewer";
import glyphMap from "./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Foundation.json";
console.log(Object.keys(glyphMap).filter(key => key.match(/tree/g)));
// console.log(icons)
const eventsFlow = createStackNavigator(
  {
    EventsList: EventsScreen,
    eventDetails: createStackNavigator(
      {
        EventDetails: EventDetailsScreen,
        ShareEvent: ShareEventScreen
      },
      {
        headerMode: "none"
      }
    ),
    EventCreate: CreateEventWizard
  },
  {
    headerMode: "none"
  }
);

eventsFlow.navigationOptions = {
  title: "Events",
  tabBarIcon: <Icon name="event-note" type="material" />
};
const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator(
    {
      Signin: SigninScreen,
      Signup: SignupScreen
    },
    { headerMode: "none" }
  ),
  main: createStackNavigator(
    {
      mainFlow: createBottomTabNavigator({
        Notifications: NotificationsScreen,
        eventsFlow,
        Account: MainProfileScreen
      }),
      mediaScreen: ImageViewer,
      profilePreview: ProfileScreen
    },
    { headerMode: "none" }
  )
});

const App = createAppContainer(switchNavigator, { style: { padding: 0 } });

export default props => {
  const [stores, setStores] = useState(createStores(props));
  console.log("new run");
  return (
    <SafeAreaProvider>
      <StoresProvider {...stores}>
        <ErrorHandler>
          <App
            ref={navigator => {
              setNavigator(navigator);
            }}
          />
        </ErrorHandler>
      </StoresProvider>
    </SafeAreaProvider>
  );
};
