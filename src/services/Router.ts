import { Page } from "./Page";

export const ROUTER_PATHS = {
  HOME: "/",
  CART: "/cart",
} as const;

type Routes = typeof ROUTER_PATHS;
type Route = Routes[keyof Routes];

export class Router {
  private currentPage: HTMLElement | null = null;
  private routes: Record<string, Page["element"]> = {};

  constructor(private root: HTMLElement) {}

  public init() {
    document.querySelectorAll("a.navlink").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const link = e.target as HTMLAnchorElement;

        const path = link.getAttribute("href") ?? "";

        this.currentPage;
        this.goTo(path);
      });
    });

    this.goTo(location.pathname);
  }

  public handleRoute(path: string, page: Page["element"]) {
    this.routes[path] = page;
  }

  private goTo(path: string) {
    console.log(`Перешли на ${path}`);

    history.pushState({}, "", path);

    const template = this.routes[path] ?? document.createElement("h1");

    this.renderPage(template);
  }

  private renderPage(pageTemplate: HTMLElement) {
    this.root.innerHTML = "";
    this.currentPage = pageTemplate;
    this.root.appendChild(pageTemplate);
  }
}
