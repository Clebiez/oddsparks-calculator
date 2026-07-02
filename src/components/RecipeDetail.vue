<script setup lang="ts">
  import type { SparkBuilder } from '@/domain/Item.ts'
  import type { Recipe } from '@/domain/Recipe'
  import { VIcon } from 'vuetify/components'
  import { recipesPerKey } from '@/domain/RecipeFactory.js'
  import BuildingDetail from './BuildingDetail.vue'
  import ItemDetail from './ItemDetail.vue'

  const { recipe, neededItemsPerMin = 0, builder } = defineProps<{
    recipe?: Recipe
    neededItemsPerMin?: number
    builder: SparkBuilder
  }>()

  const quantity = recipe?.getNumberOfRecipe(neededItemsPerMin, builder) ?? 0
</script>

<template>
  <div v-if="recipe" class="recipeDetail">
    <div class="recipeTitle">
      <item-detail :item="recipe.output.item" :item-per-minutes="neededItemsPerMin" :quantity="recipe.output.quantity" />
      <v-icon icon="mdi-equal" />
      <building-detail :building="recipe.building" :quantity="quantity" />
      <v-icon v-if="recipe.inputs.length > 0" icon="mdi-arrow-right" />

      <ul class="recipeInputs">
        <li v-for="input, index in recipe.inputs" :key="input.item" class="recipeInputItem">
          <v-icon v-if="index !== 0" icon="mdi-plus" />
          <item-detail :item="input.item" :item-per-minutes="input.quantity * neededItemsPerMin / recipe.output.quantity" :quantity="input.quantity" />
        </li>
      </ul>
    </div>

    <ul class="subItemsRecipes">
      <li v-for="input in recipe.inputs" :key="input.item">
        <recipe-detail :builder="builder" :needed-items-per-min="input.quantity * neededItemsPerMin / recipe.output.quantity" :recipe="recipesPerKey[input.item]" />
      </li>
    </ul>
  </div>

</template>

<style scoped>

.recipeDetail {
  padding: 1rem;
}

.recipeTitle {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.recipeInputs {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.recipeInputItem {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.subItemsRecipes {
  margin-left: 3rem;
}
</style>
