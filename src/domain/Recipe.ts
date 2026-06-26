import type { BuildingEnum } from "./Building";
import { ItemEnum, type Item } from "./Item";

export type ItemInput = {
  item: Item;
  quantity: number;
};

export type ItemOutput = ItemInput & {
  itemPerMinute: number;
};

export class Recipe {
  constructor(
    public inputs: ItemInput[],
    public output: ItemOutput,
    public building: BuildingEnum,
  ) {}

  getOutputRate(spark: Item) {
    switch (spark.name) {
      case ItemEnum.Stumpy_Spark:
        return this.output.itemPerMinute * 2;
      case ItemEnum.Crafty_Spark:
        return this.output.itemPerMinute * 2 * 50;
      case ItemEnum.Handy_Spark:
        return this.output.itemPerMinute * 2 * 150;
      default:
        return 0;
    }
  }
}
