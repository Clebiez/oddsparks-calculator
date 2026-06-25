import type { BuildingEnum } from "./Building";
import type { Item } from "./Item";

export type ItemInput = {
  item: Item;
  quantity: number;
};

export type ItemOutput = ItemInput & {
  itemPerMinute?: number;
};

export class Recipe {
  constructor(
    public inputs: ItemInput[],
    public output: ItemOutput,
    public building: BuildingEnum,
  ) {}
}
