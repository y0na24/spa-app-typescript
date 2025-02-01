import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { Router, ROUTER_PATHS } from "./services/Router";

import "./app.css";
import { CartPage } from "./pages/CartPage";
import { reactiveStore, Store } from "./services/Store";
import { ShoesRepo } from "./services/ShoesRepo";

interface AppRepositories {
  shoesRepository: ShoesRepo;
}

interface AppDeps {
  root: HTMLElement;
  router: Router;
  store: Store;
  repositories: AppRepositories;
}

class App {
  constructor(private deps: AppDeps) {}

  private async fetchInitialData() {
    const { shoesRepository } = this.deps.repositories;

    await shoesRepository.getShoes();
  }

  private initRouter() {
    const { router, root } = this.deps;

    router.handleRoute(ROUTER_PATHS.HOME, new HomePage(root).render());
    router.handleRoute(ROUTER_PATHS.CART, new CartPage(root).render());

    router.init();
  }

  public async run() {
    this.initRouter();
    await this.fetchInitialData();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.prepend(new Header().render());
  const root = document.getElementById("app")!;

  const router = new Router(root);

  const appDeps: AppDeps = {
    root,
    router,
    store: reactiveStore,
    repositories: {
      shoesRepository: ShoesRepo.init(reactiveStore),
    },
  };

  new App(appDeps).run();
});
