<script setup lang="ts">
  import type { SparkBuilder } from '@/domain/Item.ts'
  import type { Recipe } from '@/domain/Recipe'
  import { ref } from 'vue'
  import { VIcon } from 'vuetify/components'
  import { recipesPerKey } from '@/domain/RecipeFactory.js'
  import BuildingDetail from './BuildingDetail.vue'
  import ItemDetail from './ItemDetail.vue'

  const { recipe, neededItemsPerMin = 0, builder } = defineProps<{
    recipe?: Recipe
    neededItemsPerMin?: number
    builder: SparkBuilder
  }>()

  const isCollapsed = ref(true)

  const quantity = recipe?.getNumberOfRecipe(neededItemsPerMin, builder) ?? 0
</script>

<template>
  <div v-if="recipe" class="p-4">
    <div class="recipeTitle">
      <item-detail :item="recipe.outputs[0].item" :item-per-minutes="neededItemsPerMin" :quantity="recipe.outputs[0].quantity" />
      <v-icon icon="mdi-equal" />
      <building-detail :building="recipe.building" :quantity="quantity" />
      <v-icon v-if="recipe.inputs.length > 0" icon="mdi-arrow-right" />

      <ul class="recipeInputs">
        <li v-for="input, index in recipe.inputs" :key="input.item" class="recipeInputItem">
          <v-icon v-if="index !== 0" icon="mdi-plus" />
          <item-detail :item="input.item" :item-per-minutes="input.quantity * neededItemsPerMin / recipe.outputs[0].quantity" :quantity="input.quantity" />
        </li>
      </ul>

      <v-btn v-if="recipe.inputs.length > 0" :icon="isCollapsed ? 'mdi-menu-up' : 'mdi-menu-down'" @click="isCollapsed = !isCollapsed" />
    </div>

    <v-expand-transition>
      <ul v-show="isCollapsed" class="ml-12">
        <li v-for="input in recipe.inputs" :key="input.item">
          <recipe-detail :builder="builder" :needed-items-per-min="input.quantity * neededItemsPerMin / recipe.outputs[0].quantity" :recipe="recipesPerKey[input.item]?.[0]" />
        </li>
      </ul>
    </v-expand-transition>

  </div>

</template>

<style scoped>

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

</style>
