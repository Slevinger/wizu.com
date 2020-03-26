import axios from "axios";
import { AsyncStorage } from "react-native";
import { DEV_PATH, PROD_PATH } from "../const/config";
const instance = axios.create({
  baseURL: DEV_PATH
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Barear ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
export default instance;
