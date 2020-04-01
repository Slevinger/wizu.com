import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import pick from "lodash/pick";
import get from "lodash/get";
import {
  requestPermissionsAsync,
  Accuracy,
  getCurrentPositionAsync
} from "expo-location";
import { GEOCODE_URL, SPECIFIC_GEOCODE_URL, API_KEY } from "../const/config";

const querySuggest = (text, { latitude, longitude } = {}) => {
  return `${GEOCODE_URL}?apiKey=${API_KEY}&maxresults=5&query=${text}${
    latitude ? `&prox={${latitude}, ${longitude}},5` : ""
  }`;
};
//https://geocoder.ls.hereapi.com/6.2/geocode.json?locationid=NT_5mGkj3z90Fbj4abzMbUE4C_xA&jsonattributes=1&gen=9&apiKey=ckxM3TkGxZ9yiVZ84Pn-zkW2uf5Ftbahp2SaMS7Ihx0
const querySpesific = locationId =>
  `${SPECIFIC_GEOCODE_URL}?locationid=${locationId}&apiKey=${API_KEY}`;

const useLocation = ({ currentLocation, onLocationChange }) => {
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(currentLocation);
  const [listOfAddress, setListOfAddress] = useState([]);
  // const { addLocation } = useContext(LocationContext);
  console.log("location", location);
  const onSearchStringChanged = useCallback(async searchStr => {
    let { data: list } = await axios.get(
      querySuggest(searchStr, location.coords)
    );

    if (list) {
      console.log("list", list);
      list = list.suggestions.map(({ label, distance, locationId }) => ({
        address: label,
        distance,
        locationId
      }));

      setListOfAddress(list);
    }
  }, []);

  const setLocationById = useCallback(
    async locationId => {
      const {
        data: {
          Response: { View }
        }
      } = await axios.get(querySpesific(locationId));
      const loc = pick(View[0].Result[0].Location, [
        "DisplayPosition",
        "Address"
      ]);
      const newLocation = {
        address: loc.Address,
        coords: {
          latitude: loc.DisplayPosition.Latitude,
          longitude: loc.DisplayPosition.Longitude
        }
      };
      setLocation(newLocation);
    },
    [
      get(location, "coords.latitude", null),
      get(location, "coords.longitude", null)
    ]
  );

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const answer = await requestPermissionsAsync();
        if (!answer.granted) {
          setError("Please enable location servieces");
        } else {
          const loc = await getCurrentPositionAsync({
            accuracy: Accuracy.high,
            distanceInterval: 1
          });
          console.log("loc", loc);
          setLocation({ coords: pick(loc.coords, ["latitude", "longitude"]) });
        }
      } catch (error) {
        setError("Please enable location servieces");
      }
    };
    if (get(location, "coords.latitude", null) === null) {
      console.log("first time get coords shouldnt run more then once");
      getCurrentLocation();
    } else {
      console.log("set location in store");
      onLocationChange(location);
    }
  }, [get(location, "coords.latitude")]);

  return {
    error,
    location,
    onSearchStringChanged,
    listOfAddress,
    setLocationById
  };
};

export default useLocation;
