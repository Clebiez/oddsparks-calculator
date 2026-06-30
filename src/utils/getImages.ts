import type { BuildingEnum } from '@/domain/Building'
import type { ItemEnum } from '@/domain/Item'

export function getItemImage (itemName?: ItemEnum): string {
  if (!itemName) {
    return ''
  }
  const fileName = itemName.replace(/ /g, '_')
  return new URL(`../assets/items/${fileName}.png`, import.meta.url).href
}

export function getBuildingImage (building?: BuildingEnum): string {
  if (!building) {
    return ''
  }
  const fileName = building.replace(/ /g, '_')
  return new URL(`../assets/buildings/${fileName}.png`, import.meta.url).href
}
