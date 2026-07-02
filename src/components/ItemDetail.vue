<script setup lang="ts">
  import type { ItemEnum } from '@/domain/Item'
  import { getItemImage } from '@/utils/getImages'
  import { round } from '@/utils/round'

  type RecipeResolverProps = {
    item: ItemEnum
    quantity?: number
    itemPerMinutes?: number
  }
  defineProps<RecipeResolverProps>()
</script>

<template>
  <div class="item">
    <v-img :src="getItemImage(item)" width="64" />
    <p>{{ item }}</p>
    <p class="itemRate">({{ round(itemPerMinutes ?? 0, 2) }} items / min)</p>
  </div>
</template>

<style scoped>
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .itemRate {
    font-size: 0.8rem;
  }
</style>
