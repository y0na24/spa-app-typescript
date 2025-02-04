// 1. Регистрация роута (endpoint + нужная страница)
// 2. Изменение состояния браузера (работа с history api)
// 3. Рендеринг нужной страницы после очистки root-node'ы
// 4. Обработка клика на навигацию с последующим редиректом на нужную страницу

import { parseFromHtmlStr } from "../shared/parseFromHtmlStr";
import { isRoute, Route, ROUTER_PATHS } from "../shared/routes";
import { Page } from "../shared/ui/Page";

export class Router {
  routes = {} as Record<Route, Page["element"]>;

  constructor(private root: HTMLElement) {}

  public init() {
    document.querySelectorAll("a.navlink").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const endpoint = link.getAttribute("href") ?? "";

        this.goTo(endpoint);
      });
    });
    
    window.addEventListener("popstate", (e) => {
      e.preventDefault()
      
      this.goTo(e.state.str, false)
    })

    this.goTo(location.pathname);
  }

  public registerRoute(route: Route, pageEl: Page["element"]) {
    this.routes[route] = pageEl;
  }

  private goTo(str: string, addHistory = true) {
    if (!isRoute(str)) {
      const errorPage =
        this.routes[ROUTER_PATHS.NOT_FOUND] ??
        parseFromHtmlStr("<h1>Ошибка</h1>");

      return this.renderPage(errorPage);
    }

    if (addHistory) {
      history.pushState({ str }, "", str);
    }

    const template = this.routes[str];

    this.renderPage(template);
  }

  private renderPage(template: Page["element"]) {
    this.root.innerHTML = "";

    this.root.append(template);
  }
}
