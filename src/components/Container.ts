import { Component } from "../shared/ui/Component";

export class Container extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  public render(): HTMLElement {
    return this.element;
  }
}
