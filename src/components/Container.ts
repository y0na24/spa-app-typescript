import { Component } from "../services/Component";

export class Container extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  public render(): HTMLElement {
    return this.element;
  }
}
