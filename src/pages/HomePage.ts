import { Card } from "../components/Card";
import { Page } from "../services/Page";
import {
  Store,
  StoreEvents,
  StoreValues,
  subscribeWithCleanUp,
} from "../services/Store";
import { parseFromHtmlStr } from "../shared/parseFromHtmlStr";

export class HomePage extends Page {
  public shoesEventCleanUp;

  constructor(
    private root: HTMLElement,
    private state: Store["state"],
  ) {
    super("main-page");

    this.shoesEventCleanUp = subscribeWithCleanUp(
      StoreEvents.SHOES_CHANGES,
      () => {
        this.root = this.render();
      },
    );
  }

  protected createPage(): void {
    const title = document.createElement("h1");
    title.textContent = "Главная";
    title.className = "text-3xl mb-3 ml-10";
    this.element.prepend(title);

    const container = this.element.querySelector(".container") as HTMLElement;
    container?.classList.add("flex", "gap-5", "justify-center");

    this.appendShoes(container);
  }

  private appendShoes(container: HTMLElement) {
    if (this.state.shoes.length) {
      container.innerHTML = "";
      for (const shoe of this.state.shoes) {
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
