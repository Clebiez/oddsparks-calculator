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
  <div class="flex flex-col items-center justify-center">
    <v-img :src="getBuildingImage(building)" width="80" />
    <p>{{ round(quantity) }} x {{ building }}</p>
  </div>
</template>
