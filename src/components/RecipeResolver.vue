<script setup lang="ts">
  import type { ItemAndQuantity } from '@/domain/Item'
  import { watchEffect } from 'vue'
  import { recipesPerKey } from '@/domain/RecipeFactory'
  import RecipeDetail from './RecipeDetail.vue'

  type RecipeResolverProps = {
    selectedItems: ItemAndQuantity[]
  }
  const props = defineProps<RecipeResolverProps>()

  watchEffect(() => {
    console.log('COUCOU', props.selectedItems)
  })

</script>

<template>
  <ul>
    <li v-for="item in props.selectedItems" :key="item.item">
      <RecipeDetail :quantity="item.quantity" :recipe="recipesPerKey[item.item]" />
    </li>
  </ul>
</template>

<style scoped></style>
