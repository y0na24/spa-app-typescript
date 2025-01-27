import { Component } from "../services/Component";
import { ROUTER_PATHS } from "../services/Router";
import { parseFromHtmlStr } from "../shared/parseFromHtmlStr";

export class Navbar extends Component {
  constructor() {
    super("nav", "navbar");
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
