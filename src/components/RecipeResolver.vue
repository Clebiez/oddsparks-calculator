<script setup lang="ts">
  import { type ItemAndQuantity, ItemEnum, type SparkBuilder } from '@/domain/Item'
  import { recipesPerKey } from '@/domain/RecipeFactory'
  import RecipeDetail from './RecipeDetail.vue'

  type RecipeResolverProps = {
    selectedItems: ItemAndQuantity[]
    builder?: SparkBuilder
  }
  const { selectedItems, builder = ItemEnum.Crafty_Spark } = defineProps<RecipeResolverProps>()
  console.log(builder)

</script>

<template>
  <ul>
    <li v-for="item in selectedItems" :key="item.item">
      <RecipeDetail :builder="builder" :needed-items-per-min="recipesPerKey[item.item]?.getOutputRate(builder, item.quantity)" :recipe="recipesPerKey[item.item]" />
      <VDivider />
    </li>
  </ul>
</template>

<style scoped>
li {
  margin-top: 2rem;
}
</style>
