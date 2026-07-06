<template>
  <!-- Main row -->
  <tr class="production-row" :class="`depth-${depth}`">
    <td>
      <div class="align-center" :style="{ paddingLeft: `${depth * 24}px` }">
        <v-btn
          v-if="hasChildren"
          density="compact"
          :icon="expanded ? 'mdi-chevron-down' : 'mdi-chevron-right'"
          size="x-small"
          variant="text"
          @click="expanded = !expanded"
        />

        <span v-else-if="depth > 0" class="depth-indicator" />

        <v-avatar color="surface-variant" rounded="lg" size="32">
          <v-img :src="getItemImage(outputItem)" />
        </v-avatar>

        <span class="text-body-1">{{ outputItem }}</span>
      </div>
    </td>

    <td class="text-center">
      <span v-if="outputRate > 0" class="text-body-1 text-medium-emphasis">{{ round(outputRate, 1) }} / min</span>
    </td>

    <td>
      <div v-if="recipe" class="d-flex align-center ga-2">
        <v-avatar color="surface-variant" rounded="lg" size="32">
          <v-img :src="getBuildingImage(recipe.building)" />
        </v-avatar>

        <span class="text-body-1">{{ recipe.building }}</span>
      </div>
    </td>

    <td class="text-center">
      <span v-if="recipe && buildingCount > 0" class="text-body-1 font-weight-medium">{{ round(buildingCount, 1) }}</span>
    </td>

    <td class="text-right" style="width: 40px;">
      <v-btn
        v-if="depth === 0"
        color="error"
        density="compact"
        icon="mdi-close"
        size="x-small"
        variant="text"
        @click="$emit('remove')"
      />
    </td>
  </tr>

  <!-- Sub-recipe rows (inputs) — collapsible -->
  <template v-if="hasChildren && expanded">
    <ProductionRow
      v-for="input in recipe!.inputs"
      :key="`${input.item}-${depth}`"
      :builder="builder"
      :depth="depth + 1"
      :item="{ item: input.item, quantity: inputRate(input) }"
      :rate-override="inputRate(input)"
    />
  </template>
</template>

<script lang="ts" setup>
  import type { ItemAndQuantity, SparkBuilder } from '@/domain/Item'
  import type { ItemInput } from '@/domain/Recipe'
  import { computed, ref } from 'vue'
  import { recipesPerKey } from '@/domain/RecipeFactory'
  import { getBuildingImage, getItemImage } from '@/utils/getImages'
  import { round } from '@/utils/round'

  const props = defineProps<{
    item: ItemAndQuantity
    builder: SparkBuilder
    depth: number
    index?: number
    rateOverride?: number
  }>()

  defineEmits(['remove'])

  const expanded = ref(true)

  const outputItem = computed(() => props.item.item)

  const recipe = computed(() => recipesPerKey[props.item.item]?.[0])

  const hasChildren = computed(() => recipe.value && recipe.value.inputs.length > 0)

  const outputRate = computed(() => {
    if (props.rateOverride !== undefined) return props.rateOverride
    if (!recipe.value) return 0
    return recipe.value.getOutputRate(props.builder, props.item.quantity)
  })

  const buildingCount = computed(() => {
    if (!recipe.value) return 0
    return recipe.value.getNumberOfRecipe(outputRate.value, props.builder)
  })

  function inputRate (input: ItemInput): number {
    if (!recipe.value) return 0
    return input.quantity * outputRate.value / recipe.value.outputs[0].quantity
  }
</script>

<style scoped>
  .production-row.depth-0 {
    font-weight: 500;
  }

  .production-row.depth-0 td {
    border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  }

  .depth-indicator {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: rgba(var(--v-theme-primary), 0.4);
    flex-shrink: 0;
  }

  .production-row:not(.depth-0) td {
    opacity: 0.8;
    font-size: 0.85em;
  }
</style>
