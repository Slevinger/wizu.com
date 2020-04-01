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

  currentEventStore;

  events;

  statsStore;

  reachedOut;

  constructor(apiStore, authStore, statsStore, currentEventStore) {
    super();
    this.apiStore = apiStore;
    this.authStore = authStore;
    this.statsStore = statsStore;
    this.currentEventStore = currentEventStore;
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
    console.log("events", data);
    this.events = data;
    if (this.currentEvent) {
      this.setCurrentEvent(this.currentEvent._id);
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

    const event = event_id
      ? flatEvents.find(({ _id }) => _id === event_id)
      : null;
    this.currentEventStore.setCurrentEvent(event);
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
