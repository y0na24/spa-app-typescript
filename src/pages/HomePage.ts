import { Card } from "../components/Card";
import { Shoe } from "../shared/types";
import { Page } from "../shared/ui/Page";

const shoeList: Shoe[] = [
  {
    id: 1,
    isInCart: false,
    name: "Nike",
  },
  {
    id: 2,
    isInCart: false,
    name: "Addidas",
  },
  {
    id: 3,
    isInCart: false,
    name: "Puma",
  },
];

export class HomePage extends Page {
  constructor(private root: HTMLElement) {
    super("main-page");
  }

  protected createPage(): void {
    const container = this.element.querySelector(".container") as HTMLElement;
    container?.classList.add("flex", "gap-5", "justify-center", "flex-wrap");

    this.appendShoes(container);
  }

  private appendShoes(container: HTMLElement) {
    container.innerHTML = "";
    shoeList.forEach((shoe) => {
      container?.append(new Card(shoe).render());
    });
  }

  public render(): HTMLElement {
    this.createPage();

    return this.element;
  }
}
