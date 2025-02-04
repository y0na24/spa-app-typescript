import { Page } from "../shared/ui/Page";

export class CartPage extends Page {
  constructor(private root: HTMLElement) {
    super("main-page");
  }

  protected createPage(): void {
    const title = document.createElement("h1");

    const container = this.element.querySelector(".container") as HTMLElement;

    this.showCart(container);
  }

  private showCart(container: HTMLElement) {
    container.innerHTML = "Корзина пуста";
  }

  public render(): HTMLElement {
    this.createPage();

    return this.element;
  }
}
