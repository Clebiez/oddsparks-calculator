import type { BuildingEnum } from './Building'
import { ItemEnum } from './Item'

export type ItemInput = {
  item: ItemEnum
  quantity: number
}

export type ItemOutput = ItemInput & {
  itemsPerMinute: number
}

export class Recipe {
  constructor (
    public inputs: ItemInput[],
    public outputs: ItemOutput[],
    public building: BuildingEnum,
    public itemsPerMinute: number,
  ) {}

  getOutputRate (spark: ItemEnum, quantity = 1) {
    let output: number
    switch (spark) {
      case ItemEnum.Stumpy_Spark: {
        output = this.itemsPerMinute
        break
      }
      case ItemEnum.Crafty_Spark: {
        output = this.itemsPerMinute * 1.5
        break
      }
      case ItemEnum.Handy_Spark: {
        output = this.itemsPerMinute * 2.5
        break
      }

      default: {
        output = 0
        break
      }
    }

    // We suppose to always use 2 sparks
    return output * quantity * 2
  }

  getNumberOfRecipe (outputRate: number, builder: ItemEnum) {
    return outputRate / this.getOutputRate(builder) / this.outputs[0].quantity
  }
}
