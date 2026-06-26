import data from "../assets/data.json";
import type { BuildingEnum } from "./Building";
import { Item, type ItemEnum } from "./Item";
import { Recipe } from "./Recipe";

export const generateAllRecipes = (): Recipe[] => {
  return data.map((item) => {
    const inputs = item.inputs.map((input) => ({
      item: new Item(input.item as ItemEnum),
      quantity: input.quantity,
    }));

    const output = {
      item: new Item(item.output.item as ItemEnum),
      quantity: item.output.quantity,
      itemPerMinute: item.itemsPerMinute,
    };
    return new Recipe(inputs, output, item.building as BuildingEnum);
  });
};
