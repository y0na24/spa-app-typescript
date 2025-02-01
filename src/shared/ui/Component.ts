export abstract class Component {
  protected element: HTMLElement;

  public constructor(tagName: string, className: string) {
    this.element = document.createElement(tagName);
    this.element.className = className;
  }

  public abstract render(): HTMLElement;
}
