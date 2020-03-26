import { AutoBinder } from "../../utils/AutoBinder";
import { decorate, observable, action } from "mobx";

export class StatsStore extends AutoBinder {
  errors;

  messages;

  constructor() {
    super();
    this.errors = [];
    this.messages = [];
  }

  clearError(index) {
    this.errors = this.errors.filter((err, i) => index !== i);
  }
  clearErrors() {
    this.errors = [];
  }
  addError(error) {
    console.log("error", error);

    this.errors.push(error.message || error);
  }
  addMessage(message) {
    this.messages.push(message);
  }
}

decorate(StatsStore, {
  messages: observable,
  errors: observable,
  clearError: action,
  clearErrors: action,
  addMessage: action,
  addError: action
});
