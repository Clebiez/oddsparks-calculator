<script setup lang="ts">
  import type { Recipe } from '@/domain/Recipe'
  import { ItemEnum } from '@/domain/Item'
  import BuildingDetail from './BuildingDetail.vue'
  import ItemDetail from './ItemDetail.vue'

  type RecipeResolverProps = {
    recipe?: Recipe
    quantity: number
  }
  const { recipe, quantity } = defineProps<RecipeResolverProps>()

  const outputRate = recipe?.getOutputRate(ItemEnum.Handy_Spark, quantity) ?? 0
</script>

<template>
  <div v-if="recipe" class="recipe">
    <div>
      <building-detail :building="recipe.building" :quantity="quantity" />
    </div>

    <div>
      <item-detail :item="recipe.output.item" :item-per-minutes="outputRate" :quantity="recipe.output.quantity" />
    </div>

    <ul class="recipeInputs">
      <li v-for="input in recipe.inputs" :key="input.item">
        <item-detail :item="input.item" :item-per-minutes="input.quantity * outputRate" :quantity="input.quantity" />
      </li>
    </ul>

  </div>
</template>

<style scoped>
.recipe {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.recipeInputs {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
</style>
