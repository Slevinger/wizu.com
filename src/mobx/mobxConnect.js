import { inject } from "mobx-react";
import { Observer } from "./Observer";

export function mobxConnect(connector) {
  return Comp =>
    inject((stores, props, context) => connector(stores, props, context))(
      Observer(Comp)
    );
}
