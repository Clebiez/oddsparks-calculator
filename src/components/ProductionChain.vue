<template>
  <div v-if="selectedItems.length > 0">
    <v-table class="production-table" hover>
      <thead>
        <tr>
          <th class="text-left">Output</th>
          <th class="text-center">Rate</th>
          <th class="text-left">Building</th>
          <th class="text-center">Count</th>

          <th class="text-center" style="width: 40px;">
            <v-btn
              color="error"
              density="compact"
              icon="mdi-delete-outline"
              size="x-small"
              variant="text"
              @click="$emit('reset')"
            />
          </th>
        </tr>
      </thead>

      <tbody>
        <template v-for="(item, index) in selectedItems" :key="`${item.item}-${index}`">
          <ProductionRow
            :builder="builder"
            :depth="0"
            :index="index"
            :item="item"
            @remove="$emit('remove-item', index)"
          />
        </template>
      </tbody>
    </v-table>
  </div>

  <div v-else class="text-center py-10 text-medium-emphasis">
    <v-icon class="mb-2" icon="mdi-package-variant" size="36" />
    <p class="text-body-2">Add an item to see the production chain.</p>
  </div>
</template>

<script lang="ts" setup>
  import type { ItemAndQuantity, SparkBuilder } from '@/domain/Item'
  import ProductionRow from './ProductionRow.vue'

  defineProps<{
    selectedItems: ItemAndQuantity[]
    builder: SparkBuilder
  }>()

  defineEmits(['remove-item', 'reset'])
</script>

<style scoped>
  .production-table {
    background: transparent !important;
    font-size: 100%;
  }
</style>
