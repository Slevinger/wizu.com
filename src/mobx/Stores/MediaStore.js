import { AutoBinder } from "../../utils/AutoBinder";
import { decorate, observable, computed, action } from "mobx";
import { navigate, navigateBack } from "../../utils/navigationRef";

import EmptyElement from "../../../assets/empty-image.png";

export class MediaStore extends AutoBinder {
  index;

  mediaSource;

  visible;

  constructor() {
    super();
    this.mediaSource = null;

    // this.index = null;
    // this.mediaUris = [];
  }

  hideMedia() {
    navigateBack();
    this.mediaSource = null;
  }

  setMediaSource(uri) {
    this.mediaSource = uri
      ? { uri: uri.replace("?alt=media", "") + "?alt=media" }
      : EmptyElement;
    navigate("mediaScreen");
  }
}

decorate(MediaStore, {
  mediaSource: observable,
  setMediaSource: action,
  hideMedia: action
});
