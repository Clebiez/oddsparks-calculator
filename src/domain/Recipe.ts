import type { BuildingEnum } from './Building'
import { ItemEnum } from './Item'

export type ItemInput = {
  item: ItemEnum
  quantity: number
}

export type ItemOutput = ItemInput & {
  itemPerMinute: number
}

export class Recipe {
  constructor (
    public inputs: ItemInput[],
    public output: ItemOutput,
    public building: BuildingEnum,
  ) {}

  getOutputRate (spark: ItemEnum, quantity = 1) {
    let output: number
    switch (spark) {
      case ItemEnum.Stumpy_Spark: {
        output = this.output.itemPerMinute
        break
      }
      case ItemEnum.Crafty_Spark: {
        output = this.output.itemPerMinute * 1.5
        break
      }
      case ItemEnum.Handy_Spark: {
        output = this.output.itemPerMinute * 2.5
        break
      }

      default: {
        output = 0
        break
      }
    }

    return output * quantity
  }

  getNumberOfRecipe (outputRate: number) {
    return Math.ceil(outputRate / this.output.itemPerMinute)
  }
}
