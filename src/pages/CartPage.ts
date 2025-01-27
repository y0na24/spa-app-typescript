import { Page } from "../services/Page";

export class CartPage extends Page {
  constructor(private root: HTMLElement) {
    super("main-page");
  }

  protected createPage(): void {
    const title = document.createElement("h1");
    title.textContent = "Корзина";
    title.className = "text-3xl mb-3 ml-10";
    this.element.prepend(title);

    this.element.querySelector(".container")?.append(title);
  }

  public render(): HTMLElement {
    this.createPage();

    return this.element;
  }
}
