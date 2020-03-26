import { toJS } from "mobx";
export const createFormData = photo => {
  const data = new FormData();
  data.append("file", photo);

  return data;
};

export const getUsersByPhonesApi = list => {
  return {
    method: "post",
    url: `/users/get`,
    body: { phoneNumbers: list },
    headers: {
      "Content-Type": "application/json"
    }
  };
};

export const updateImageApi = ({ data }) => {
  return {
    method: "post",
    url: `/users/image`,
    body: data,
    headers: {
      "Content-Type": "multipart/form-data",
      mimeType: "multipart/form-data"
    }
  };
};

export const updateUserApi = user => {
  return {
    method: "patch",
    url: `/users`,
    body: user,
    headers: {
      "Content-Type": "application/json"
    }
  };
};

export const updateProfileImageApi = ({ data }) => {
  return {
    method: "post",
    url: `/users/me/avatar`,
    body: data,
    headers: {
      "Content-Type": "multipart/form-data",
      mimeType: "multipart/form-data"
    }
  };
};

export const replayApi = (user_id, answer) => ({
  method: "patch",
  url: `/correspondences/users/${user_id}/${answer}`
});
