import { Page } from "../shared/ui/Page";
import { Store, StoreEvents, subscribe } from "../services/Store";
import { parseFromHtmlStr } from "../shared/parseFromHtmlStr";
import { Card } from "../components/Card";

export class CartPage extends Page {
  private store: Store;

  constructor(private root: HTMLElement) {
    super("main-page");

    this.store = subscribe(StoreEvents.SHOES_CHANGES, () => {
      this.root = this.render();
    });
  }

  protected createPage(): void {
    const title = document.createElement("h1");

    const container = this.element.querySelector(".container") as HTMLElement;

    this.showCart(container);
  }

  private showCart(container: HTMLElement) {
    const shoesInCart = this.store.getShoesInCart();

    container.innerHTML = "";
    if (!shoesInCart) {
      container.append(
        parseFromHtmlStr(
          `<h2 class="text-center text-red-600">Корзина пуста</h2>`,
        ),
      );
    } else {
      for (const shoe of shoesInCart) {
        container.append(new Card(shoe).render());
      }
    }
  }

  public render(): HTMLElement {
    this.createPage();

    return this.element;
  }
}
