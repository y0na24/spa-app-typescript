import { Component } from "../shared/ui/Component";
import { ROUTER_PATHS } from "../services/Router";
import { parseFromHtmlStr } from "../shared/parseFromHtmlStr";
import { Store, StoreEvents, subscribe } from "../services/Store";

export class Navbar extends Component {
  private store: Store;

  constructor() {
    super("nav", "navbar");

    this.store = subscribe(StoreEvents.SHOES_CHANGES, (store) => {
      const badge = this.element.querySelector(".badge")!;

      badge.textContent = String(store.getShoesInCartLength());
    });
  }

  private createElement() {
    const ulNode = parseFromHtmlStr(ulHtml);
    this.element.append(ulNode);
  }

  public render(): HTMLElement {
    this.createElement();

    return this.element;
  }
}

const ulHtml = `<ul class="menu menu-horizontal lg:menu-horizontal bg-base-200 rounded-box mb-10">
  <li><a class="navlink" href="${ROUTER_PATHS.HOME}">Главная</a></li>
  <li><a class="navlink" href="${ROUTER_PATHS.CART}">Корзина
  <div class="badge badge-primary text-white badge-sm">0</div>
  </a></li>
</ul>`;
