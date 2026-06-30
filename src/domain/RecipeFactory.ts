import type { BuildingEnum } from './Building'
import type { ItemEnum } from './Item'
import data from '../assets/data.json'
import { Recipe } from './Recipe'

export const recipesPerKey: Partial<Record<ItemEnum, Recipe>> = {}

for (const item of data) {
  const inputs = item.inputs.map(input => ({
    item: input.item as ItemEnum,
    quantity: input.quantity,
  }))

  const output = {
    item: item.output.item as ItemEnum,
    quantity: item.output.quantity,
    itemPerMinute: item.itemsPerMinute,
  }
  recipesPerKey[item.title as ItemEnum] = new Recipe(inputs, output, item.building as BuildingEnum)
}
