import React, { useState, useCallback, useEffect, useRef } from "react";
import { View, TextInput, Text } from "react-native";
import axios from "axios";
import styled from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const API_KEY = "ckxM3TkGxZ9yiVZ84Pn-zkW2uf5Ftbahp2SaMS7Ihx0";
const GEOCODE_URL =
  "https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json";

const StyledContainer = styled(View)`
  margin-left: 15px;
  margin-right: 15px;
  padding: 5px;
`;

const StyledInput = styled(View)`
  background-color: #f0eeee;
  height: 40px;
  border-radius: 5px;
  margin-top: 2px;
  margin-bottom: 10px;
  flex-direction: row;
`;

const StyledSearch = styled(TextInput)`
  flex: 1;
  font-size: 18;
`;

const StyledMaterialIcon = styled(MaterialIcons)`
  font-size: 30;
  align-self: center;
`;

const StyledAddress = styled(View)`
  height: 50;
  margin: 3px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: lightgrey;
`;

const Address = ({ address, distance }) => {
  return (
    <StyledAddress>
      <Text>{address}</Text>
      <Text>{distance / 1000}km</Text>
    </StyledAddress>
  );
};
const getLocation = setCoordinates => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ latitude, longitude });
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

export const useLocationPicker = ({ onValueSet, currentLocation, onFocus }) => {
  const [currentText, setCurrentText] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [showList, setShowList] = useState(false);
  const [radius, setRadius] = useState(5);
  const [location, setLocation] = useState(currentLocation);
  const [listOfLocations, setListOfLocations] = useState([]);

  useEffect(() => {
    getLocation(setCoordinates);
    // return () => {
    //   cleanup;
    // };
  }, []);

  useEffect(() => {
    setShowList(true);
  }, [currentText]);
  const textChanged = useCallback(
    e => {
      setCurrentText(e.nativeEvent.text);
      setLocation(e.nativeEvent.text);
      const query = `${GEOCODE_URL}?apiKey=${API_KEY}&maxresults=5&query=${
        e.nativeEvent.text
      }${coordinates && `&prox=${Object.values(coordinates)},${radius}`}`;
      (async () => {
        const { data } = await axios.get(query);
        if (data) {
          const list = data.suggestions.map(
            ({ label, distance, locationId }) => ({
              address: label,
              distance,
              locationId
            })
          );
          setListOfLocations(list);
        }
      })();
    },
    [coordinates]
  );

  const locationSearchBar = (
    <StyledContainer>
      <Text style={{ paddingLeft: 5 }}>Address</Text>
      <StyledInput onFocus={onFocus}>
        <StyledMaterialIcon name="edit-location" />
        <StyledSearch
          placeholder="Address"
          value={location}
          onChange={textChanged}
        />
      </StyledInput>
    </StyledContainer>
  );

  const addressDropdownList = (
    <>
      {currentText.length > 0 &&
        showList &&
        listOfLocations.map(location => (
          <TouchableOpacity
            onPress={() => {
              setShowList(false);
              setLocation(location.address);
              onValueSet(location);
            }}
          >
            <Address {...location} />
          </TouchableOpacity>
        ))}
    </>
  );

  return { locationSearchBar, addressDropdownList };
  // return { LocationSetter };
};
