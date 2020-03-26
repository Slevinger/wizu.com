import { toJS } from "mobx";
export const createFormData = photo => {
  const data = new FormData();
  data.append("file", photo);

  return data;
};

export const getEventsApi = () => {
  return {
    method: "get",
    url: `/users/me/events`,
    headers: {
      "Content-Type": "application/json"
    }
  };
};

export const updateImageApi = ({ event_id, data }) => {
  return {
    method: "post",
    url: `/events/${event_id}/image`,
    body: data,
    headers: {
      "Content-Type": "multipart/form-data",
      mimeType: "multipart/form-data"
    }
  };
};

export const updateEventApi = event => {
  return {
    method: "patch",
    url: `/events/${event._id}`,
    body: { event: toJS(event) },
    headers: {
      "Content-Type": "application/json"
    }
  };
};

export const replayApi = (eventId, answer) => {
  return {
    method: "patch",
    url: `/correspondences/events/${eventId}/${answer}`
  };
};
