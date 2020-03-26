import { useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";

export const createFormData = photo => {
  const data = new FormData();
  const uriArr = photo.uri.split("/");
  const name = uriArr[uriArr.length - 1];
  data.append("file", {
    name,
    type: "image/jpeg",
    uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  });

  return data;
};

export default (updateImage, _id, image_url) => {
  const [pickerResult, setPickerResult] = useState(null);
  const [imageUrl, setImageUrl] = useState(image_url);

  const imageSelected = useCallback(async image => {
    const body = createFormData(image);
    const res = await updateImage(_id, body);
    setImageUrl(res);
  }, []);

  const openImagePickerAsync = useCallback(() => {
    setImageUrl("http://www");
    const callback = async () => {
      let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync();
      if (result.cancelled) {
        setImageUrl(image_url);
      } else {
        setPickerResult(result);
        imageSelected(result);
      }
    };
    callback();
  }, [pickerResult]);

  return { openImagePickerAsync, imageUrl };
};
