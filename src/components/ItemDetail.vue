<script setup lang="ts">
  import type { ItemEnum } from '@/domain/Item'
  import { getItemImage } from '@/utils/getImages'

  type RecipeResolverProps = {
    item: ItemEnum
    quantity?: number
    itemPerMinutes: number
  }
  defineProps<RecipeResolverProps>()
</script>

<template>
  <div class="item">
    <v-img :src="getItemImage(item)" width="64" />
    <p><span v-if="quantity">{{ quantity }} x </span>{{ item }}</p>
    <p>{{ itemPerMinutes }} items / min</p>
  </div>
</template>

<style scoped>
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
