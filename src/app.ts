import { Header } from "./components/Header";
import "./global.css";
import { CartPage } from "./pages/CartPage";
import { HomePage } from "./pages/HomePage";
import { Router } from "./services/Router";
import { ROUTER_PATHS } from "./shared/routes";

class App {
  root: HTMLElement;
  router: Router;

  constructor() {
    document.body.prepend(new Header().render());
    this.root = document.getElementById("app")!;
    this.router = new Router(this.root);
  }

  private initRouter() {
    this.router.registerRoute(ROUTER_PATHS.HOME, new HomePage(this.root).render())
    this.router.registerRoute(ROUTER_PATHS.CART, new CartPage(this.root).render())
    
    this.router.init()
  }

  public run() {
    this.initRouter()
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App().run();
});
