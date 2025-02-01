import { Container } from "../../components/Container";

export abstract class Page {
  protected element: HTMLElement;

  constructor(className: string) {
    this.element = document.createElement("div");
    this.element.className = className;

    const container = new Container("div", "container").render();
    this.element.append(container);
  }

  protected abstract createPage(): void;
  public abstract render(): HTMLElement;
}
