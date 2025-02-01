import { Component } from "../shared/ui/Component";
import { Navbar } from "./Navbar";

export class Header extends Component {
  constructor() {
    super("header", "header");
  }

  private createElement(): void {
    const navbar = new Navbar().render();
    this.element.append(navbar);
  }

  public render(): HTMLElement {
    this.createElement();

    return this.element;
  }
}
