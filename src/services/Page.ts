import { Container } from "../components/Container";

export abstract class Page {
  protected element: HTMLElement;

  constructor(className: string) {
    this.element = document.createElement("div");
    this.element.className = className;
    this.element.append(new Container("div", "container").render());
  }

  protected abstract createPage(): void;
  public abstract render(): HTMLElement;
}
