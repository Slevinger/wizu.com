import { AutoBinder } from "../../utils/AutoBinder";
import { decorate, observable, action, toJS } from "mobx";
import {
  getEventsApi,
  updateImageApi,
  updateEventApi,
  replayApi
} from "../api/eventsApis";

export class EventsStore extends AutoBinder {
  apiStore;

  authStore;

  events;

  currentEvent;

  statsStore;

  reachedOut;

  constructor(apiStore, authStore, statsStore) {
    super();
    this.apiStore = apiStore;
    this.authStore = authStore;
    this.statsStore = statsStore;
    this.reset();
  }

  reset() {
    this.events = [];
    this.currentEvent = null;
    this.reachedOut = false;
  }

  async getEvents() {
    const api = getEventsApi();
    this.reachedOut = true;
    const data = await this.apiStore.callApi(api);
    this.events = data;
    if (this.currentEvent) {
      this.setCurrentEvent(this.currentEvent._id);
    }
  }

  async setEventSeen() {
    try {
      if (this.currentEvent && this.currentEvent.answer === "not seen yet") {
        await this.setSeen();
      }
    } catch (err) {
      this.statsStore.addError(err);
    }
  }

  async setInterested() {
    try {
      const api = replayApi(this.currentEvent._id, "interested");
      await this.apiStore.callApi(api);
      await this.getEvents();
    } catch (err) {
      this.statsStore.addError(err);
    }
  }

  async setSeen() {
    try {
      const api = replayApi(this.currentEvent._id, "seen");
      await this.apiStore.callApi(api);
      await this.getEvents();
    } catch (err) {
      this.statsStore.addError(err);
    }
  }

  async approveInvite() {
    try {
      const api = replayApi(this.currentEvent._id, "confirm");
      await this.apiStore.callApi(api);
      await this.getEvents();
    } catch (err) {
      this.statsStore.addError(err);
    }
  }

  async setCurrentEvent(event_id) {
    if (!this.reachedOut) {
      await this.getEvents();
    }
    const flatEvents = Object.keys(this.events).reduce(
      (acc, answer) => [
        ...acc,
        ...this.events[answer].map(event => ({ ...event, answer }))
      ],
      []
    );

    this.currentEvent = event_id
      ? flatEvents.find(({ _id }) => _id === event_id)
      : null;
  }

  setLocation(location) {
    this.currentEvent.location = location;
  }

  async updateImage(event_id, data) {
    try {
      const { username } = this.authStore;
      this.currentEvent.image_url = "http:\\www";

      const api = updateImageApi({ event_id, username, data });
      const answer = await this.apiStore.callApi(api);
      if (this.currentEvent) {
        this.currentEvent.image_url = answer;
      }
      await this.getEvents();
      return answer;
      // this.events.find(({ _id }) => _id === event_id).image_url = answer;

      // const credentials = await Keychain.getGenericPassword();
    } catch (err) {
      console.log("error", err);
    }
  }

  async commitEventChanges() {
    if (this.currentEvent) {
      const api = updateEventApi(this.authStore.token, this.currentEvent);
      const answer = await this.apiStore.callApi(api);
      await this.getEvents();
      return answer;
    }
  }
}

decorate(EventsStore, {
  currentEvent: observable,
  events: observable,
  getEvents: action,
  setEventSeen: action,
  setSeen: action,
  approveInvite: action,
  commitEventChanges: action,
  updateImage: action,
  setLocation: action,
  setCurrentEvent: action
});
