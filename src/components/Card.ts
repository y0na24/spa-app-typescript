import { Component } from "../shared/ui/Component";
import { cn } from "../shared/cn";
import { parseFromHtmlStr } from "../shared/parseFromHtmlStr";
import { Shoe } from "../shared/types";

export class Card extends Component {
  constructor(private shoe: Shoe) {
    super("div", "card bg-primary text-primary-content w-96");
  }

  private createElement() {
    const cardTemplate = createCardTemplate(this.shoe);
    this.element.append(parseFromHtmlStr(cardTemplate));
  }

  public render(): HTMLElement {
    this.createElement();

    return this.element;
  }
}

const createCardTemplate = ({ name, id, isInCart }: Shoe) => {
  const styles = cn("btn", isInCart && "btn-error");
  const buttonName = isInCart ? "В корзине" : "Добавить";

  return `
    <div id=${id} class="card-body">
        <h2 class="card-title">${name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <button class="${styles}">${buttonName}</button>
        </div>
      </div>
    `;
};
