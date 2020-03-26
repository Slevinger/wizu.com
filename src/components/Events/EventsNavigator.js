import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Events from "./EventsList";
import EventPage from "./EventPage";
export default EventsNavigator = createStackNavigator(
  {
    Events: { screen: Events },
    Event: { screen: EventPage }
  },
  {
    initialRouteName: "Events"
  }
);
