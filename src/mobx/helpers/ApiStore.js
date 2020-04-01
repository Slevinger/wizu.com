// @flow

import axios from "../../api/wizUapi";
import { AutoBinder } from "../../utils/AutoBinder";

export class ApiStore extends AutoBinder {
  modalStore;
  statsStore;

  constructor(modalStore, statsStore) {
    super();
    this.modalStore = modalStore;
    this.statsStore = statsStore;
  }

  // @ignoreFlowError
  async callApi(api, callback) {
    try {
      // @ignoreFlowError
      const { method, url, headers, body = {} } = api;
      const answer = await (method === "get"
        ? axios(api)
        : axios[method](url, body, { headers }));

      const { data, error } = answer.data;
      if (error) {
        console.log(error);
        throw new Error(error);
      }
      if (callback) {
        await callback(data);
      } else {
        return data;
      }
    } catch (e) {
      if (!e.response) {
        throw new Error(e.data);
      }
      // const { errorMessage, showErrorModal = true } = api;
      const { status, data } = e.response;
      const { message } = data;

      // this.statsStore.addError(message);
      // if (status === 401) {
      //   console.log("401", message);
      // } else if (status === 403) {
      //   console.log("403", message);
      // } else if (!showErrorModal) {
      //   if (callback) {
      //     callback(null, message);
      //   } else {
      //     throw new Error(message);
      //   }
      // } else {
      //   const displayedError = errorMessage
      //     ? typeof errorMessage === "function"
      //       ? errorMessage(status)
      //       : errorMessage
      //     : message;
      //   this.modalStore.showErrorModal(displayedError);
      // }
    }
  }
}
