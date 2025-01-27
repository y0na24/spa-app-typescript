import { Shoe } from "../shared/types";

export const enum StoreValues {
  CART = "cart",
  SHOES = "shoes",
}

export const enum StoreEvents {
  CART_CHANGES = "CART_CHANGES",
  SHOES_CHANGES = "SHOES_CHANGES",
}

interface State {
  cart: any;
  shoes: Shoe[];
}

export class Store {
  static instance: Store;

  state: State = {
    cart: [],
    shoes: [],
  };

  private constructor() {}

  public static init() {
    if (!Store.instance) {
      Store.instance = new Store();
    }

    return Store.instance;
  }
}

export const reactiveState = new Proxy(Store.init().state, {
  set(target: Store["state"], prop: StoreValues, value) {
    target[prop] = value;

    const events: Record<StoreValues, StoreEvents> = {
      [StoreValues.CART]: StoreEvents.CART_CHANGES,
      [StoreValues.SHOES]: StoreEvents.SHOES_CHANGES,
    };

    console.log(events[prop]);
    events[prop] && dispatchEvent(new Event(events[prop]));

    return true;
  },
});

export const subscribeWithCleanUp = (
  event: StoreEvents,
  listener: Parameters<typeof addEventListener>["1"],
) => {
  window.addEventListener(event, listener);

  return () => window.removeEventListener(event, listener);
};
