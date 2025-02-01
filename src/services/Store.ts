import { Shoe } from "../shared/types";

export const enum StoreValues {
  SHOES = "shoes",
}

export const enum StoreEvents {
  SHOES_CHANGES = "SHOES_CHANGES",
}

export interface State {
  shoes: Shoe[];
}

export class Store {
  static instance: Store;

  shoes: Shoe[] = [];

  private constructor() {}

  public static init() {
    if (!Store.instance) {
      Store.instance = new Store();
    }

    return Store.instance;
  }

  public addItemInCart(id: Shoe["id"]) {
    const targetShoe = this.shoes.find((shoe) => shoe.id === id);

    if (!targetShoe) return console.error("Не удалось найти id");

    this.shoes = [...this.shoes, targetShoe];
  }

  public getShoesInCart() {
    return this.shoes.filter((shoe) => shoe.isInCart);
  }

  public getShoesInCartLength() {
    return this.getShoesInCart().length;
  }
}

export const reactiveStore = new Proxy(Store.init(), {
  set(target: Store, prop: StoreValues, value) {
    target[prop] = value;

    const events: Record<StoreValues, StoreEvents> = {
      [StoreValues.SHOES]: StoreEvents.SHOES_CHANGES,
    };

    events[prop] && dispatchEvent(new Event(events[prop]));

    return true;
  },
});

export const subscribe = (
  event: StoreEvents,
  listener: (store: Store) => void,
) => {
  window.addEventListener(event, () => listener(reactiveStore));

  return reactiveStore;
};
