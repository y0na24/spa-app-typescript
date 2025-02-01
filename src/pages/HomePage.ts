import { Card } from "../components/Card";
import { Page } from "../shared/ui/Page";
import { Store, StoreEvents, subscribe } from "../services/Store";
import { parseFromHtmlStr } from "../shared/parseFromHtmlStr";

export class HomePage extends Page {
  private store: Store;

  constructor(private root: HTMLElement) {
    super("main-page");

    this.store = subscribe(StoreEvents.SHOES_CHANGES, () => {
      this.root = this.render();
    });
  }

  protected createPage(): void {
    const container = this.element.querySelector(".container") as HTMLElement;
    container?.classList.add("flex", "gap-5", "justify-center");

    this.appendShoes(container);
  }

  private appendShoes(container: HTMLElement) {
    if (this.store.shoes.length) {
      container.innerHTML = "";
      for (const shoe of this.store.shoes) {
        container?.append(new Card(shoe).render());
      }
    } else {
      container.append(
        parseFromHtmlStr(
          `<span class="loading loading-infinity loading-lg"></span>`,
        ),
      );
    }
  }

  public render(): HTMLElement {
    this.createPage();

    return this.element;
  }
}
