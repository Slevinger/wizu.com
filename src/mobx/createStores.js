import { AuthStore } from "./Stores/AuthStore";
import { ApiStore } from "./helpers/ApiStore";
import { ModalStore } from "./helpers/ModalStore";
import { EventsStore } from "./Stores/EventsStore";
import { UserStore } from "./Stores/UserStore";
import { StatsStore } from "./Stores/StatsStore";
import { MediaStore } from "./Stores/MediaStore";
import { CurrentEventStore } from "./Stores/CurrentEventStore";

export const createStores = props => {
  const mediaStore = new MediaStore();
  const statsStore = new StatsStore();
  const modalStore = new ModalStore(statsStore);
  const apiStore = new ApiStore(modalStore, statsStore);
  const authStore = new AuthStore(apiStore, statsStore);
  const currentEventStore = new CurrentEventStore(
    apiStore,
    authStore,
    statsStore
  );
  const eventsStore = new EventsStore(
    apiStore,
    authStore,
    statsStore,
    currentEventStore
  );
  const userStore = new UserStore(modalStore, apiStore, authStore, statsStore);

  return {
    apiStore,
    modalStore,
    authStore,
    eventsStore,
    userStore,
    statsStore,
    mediaStore,
    currentEventStore
  };
};
