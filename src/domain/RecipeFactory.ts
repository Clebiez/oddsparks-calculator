import type { BuildingEnum } from './Building'
import type { ItemEnum } from './Item'
import data from '../assets/data.json'
import { Recipe } from './Recipe'

export const recipesPerKey: Partial<Record<ItemEnum, Recipe[]>> = {}

for (const item of data) {
  const inputs = item.inputs.map(input => ({
    item: input.item as ItemEnum,
    quantity: input.quantity,
  }))

  const outputs = item.output.map(output => ({
    item: output.item as ItemEnum,
    quantity: output.quantity,
    itemsPerMinute: output.quantity * item.itemsPerMinute,
  }))

  for (const output of item.output) {
    if (!recipesPerKey[output.item as ItemEnum]) {
      recipesPerKey[output.item as ItemEnum] = []
    }

    recipesPerKey[output.item as ItemEnum]?.push(
      new Recipe(
        inputs,
        outputs,
        item.building as BuildingEnum,
        item.itemsPerMinute,
      ),
    )
  }
}

console.log(recipesPerKey)
