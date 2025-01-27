import { Shoe } from "../shared/types";
import { Store } from "./Store";

export class ShoesRepo {
  static instance: ShoesRepo;

  constructor(private state: Store["state"]) {}

  public static init(state: Store["state"]) {
    if (!ShoesRepo.instance) {
      ShoesRepo.instance = new ShoesRepo(state);
    }

    return ShoesRepo.instance;
  }

  public async getShoes() {
    this.state.shoes = await getFakeData<Shoe[]>();
  }
}

const fakeData: any = [
  {
    id: 1,
    name: "Nike",
    isInCart: false,
  },
  {
    id: 2,
    name: "Addidas",
    isInCart: true,
  },
  {
    id: 3,
    name: "Puma",
    isInCart: false,
  },
];

const getFakeData = <Data>() => {
  return new Promise<Data>((res) => {
    setTimeout(() => res(fakeData), 1500);
  });
};
