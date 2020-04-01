import React, { useMemo, useEffect } from "react";
import { Text, Input } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import Spacer from "../../Spacer";
import { ScrollView } from "react-native-gesture-handler";
import { mobxConnect } from "../../../mobx/mobxConnect";
import get from "lodash/get";
import values from "lodash/values";
import TextComboBox from "../../Forms/TextComboBox";
import { toJS } from "mobx";
import EventNatureItem from "./EventNatureItem";
import MapView, { Polyline, Circle } from "react-native-maps";
import useLocation from "../../../hooks/useLocation";
import styled from "styled-components";
const StyledAddress = styled(View)`
  height: 50px;

  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: lightgrey;
`;

const Address = ({ address, distance }) => {
  return (
    <StyledAddress>
      <Text>{address}</Text>
      <Text>{distance || 0 / 1000}km</Text>
    </StyledAddress>
  );
};

const Step2 = ({ currentEvent, setEventLocation, ...props }) => {
  const { location: currentEventLocation } = currentEvent;
  // console.log
  const { address = {} } = currentEventLocation;
  const {
    location,
    onSearchStringChanged,
    listOfAddress,
    setLocationById
  } = useLocation({
    currentLocation: currentEventLocation,
    onLocationChange: setEventLocation
  });

  console.log("hook location:", toJS(location));

  useEffect(() => {
    console.log("effect set event location", toJS(location.coords));
    setEventLocation(location);
    return () => {};
  }, [
    get(location, "coords.latitude", null),
    get(location, "coords.longitude", null)
  ]);

  const Map = useMemo(() => {
    console.log("memo render map", toJS(location.coords));
    return (
      <MapView
        initialRegion={{
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
          ...location.coords
        }}
        style={{ height: 200 }}
      />
    );
  }, [location]);
  // const [eventLocation, setEventPostion] = useState(position);
  // useEffect(() => {bjec
  //   eventLocation =
  //   return () => {
  //     cleanup;
  //   };
  // }, [location]);

  console.log("render map values ", toJS(location.coords));

  console.log("curentEvent", toJS(currentEvent));
  return (
    <ScrollView key={address.label} style={styles.stepContainer}>
      {Map}
      <TextComboBox
        label={"Address"}
        onSelect={async item => {
          // await setEventLocation(address);
          setLocationById(item.locationId);

          // setEventNature(item.label);
        }}
        // onChange={setEventLocation}
        onTextValueChanged={text => {
          console.log("text", text);
          if (text.length % 2 === 0) {
            onSearchStringChanged(text);
          }
        }}
        value={get(location.address, "City")}
        editable={true}
        isDisabled={false}
        data={listOfAddress}
        // isDisabled={false}
        ItemOverlay={Address}
      />
      {/* <Input numberOfLines={4} style={{ flexWrap: "wrap" }} /> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  stepContainer: { marginLeft: 50, marginTop: 50, marginRight: 50 },
  inputContainerStyle: {
    borderBottomWidth: 0,
    backgroundColor: "lightgrey"
  },
  inputStyle: {
    height: 150,
    justifyContent: "flex-start"
  },
  textContainer: {
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.1)",
    padding: 10,
    paddingTop: 30,
    paddingBottom: 30,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default mobxConnect(
  ({ currentEventStore: { setEventLocation, currentEvent } }) => {
    // console.log(location);
    return {
      setEventLocation,
      currentEvent
    };
  }
)(Step2);
