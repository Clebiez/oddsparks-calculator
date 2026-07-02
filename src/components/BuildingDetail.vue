<script setup lang="ts">
  import type { BuildingEnum } from '@/domain/Building'
  import { getBuildingImage } from '@/utils/getImages'
  import { round } from '@/utils/round'

  type BuildingDetailProps = {
    building: BuildingEnum
    quantity: number
  }
  defineProps<BuildingDetailProps>()
</script>

<template>
  <div class="building">
    <v-img :src="getBuildingImage(building)" width="80" />
    <p>{{ round(quantity) }} x {{ building }}</p>
  </div>
</template>

<style scoped>
  .building {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
