<template>
  <!-- Main row -->
  <tr class="production-row" :class="`depth-${depth}`">
    <td>
      <div class="d-flex align-center ga-2" :style="{ paddingLeft: `${depth * 24}px` }">
        <v-btn
          v-if="hasChildren"
          :icon="expanded ? 'mdi-chevron-down' : 'mdi-chevron-right'"
          size="x-small"
          variant="text"
          @click="expanded = !expanded"
        />

        <span v-else-if="depth > 0" class="depth-indicator mr-5 ml-4" />

        <v-avatar color="surface-variant" rounded="lg" size="32">
          <v-img :src="getItemImage(outputItem)" />
        </v-avatar>

        <span class="text-body-1">{{ outputItem }}</span>

        <v-chip
          v-if="isCycle"
          color="warning"
          density="compact"
          prepend-icon="mdi-refresh"
          size="x-small"
          variant="tonal"
        >
          loop
        </v-chip>
      </div>
    </td>

    <td class="text-center">
      <span v-if="outputRate > 0" class="text-body-1 text-medium-emphasis">{{ round(outputRate, 1) }} / min</span>
    </td>

    <td>
      <div v-if="recipe && !isCycle" class="d-flex align-center ga-2">
        <v-avatar color="surface-variant" rounded="lg" size="32">
          <v-img :src="getBuildingImage(recipe.building)" />
        </v-avatar>

        <span class="text-body-1">{{ recipe.building }}</span>
      </div>
    </td>

    <td class="text-center">
      <span v-if="recipe && !isCycle && buildingCount > 0" class="text-body-1 font-weight-medium">{{ round(buildingCount, 1) }}</span>
    </td>

    <td class="text-right" style="width: 40px;">
      <v-btn
        v-if="depth === 0"
        color="error"
        icon="mdi-close"
        size="x-small"
        variant="text"
        @click="$emit('remove')"
      />

      <v-btn
        v-if="hasMultipleRecipes && !isCycle"
        icon="mdi-swap-horizontal"
        size="x-small"
        variant="text"
        @click="dialogOpen = true"
      />
    </td>
  </tr>

  <!-- Sub-recipe rows (inputs) — collapsible, skip if cycle -->
  <template v-if="hasChildren && expanded && !isCycle">
    <ProductionRow
      v-for="input in recipe!.inputs"
      :key="`${input.item}-${depth}-${recipeIndex}`"
      :ancestors="currentAncestors"
      :builder="builder"
      :depth="depth + 1"
      :item="{ item: input.item, quantity: inputRate(input) }"
      :rate-override="inputRate(input)"
    />
  </template>

  <!-- Recipe selection dialog -->
  <v-dialog v-model="dialogOpen" max-width="440">
    <v-card>
      <v-card-title class="d-flex align-center ga-2">
        <v-avatar color="surface-variant" rounded="lg" size="28">
          <v-img :src="getItemImage(outputItem)" />
        </v-avatar>
        {{ outputItem }} — Choose recipe
      </v-card-title>

      <v-card-text class="pa-0">
        <v-list>
          <v-list-item
            v-for="(r, i) in allRecipes"
            :key="i"
            :active="i === recipeIndex"
            class="py-3"
            @click="selectRecipe(i)"
          >
            <template #prepend>
              <v-avatar color="surface-variant" rounded="lg" size="32">
                <v-img :src="getItemImage(r.outputs[0].item)" />
              </v-avatar>
            </template>

            <v-list-item-title class="text-body-1">{{ r.outputs[0].item }}</v-list-item-title>

            <v-list-item-subtitle class="text-body-2">
              <div v-for="(input, j) in r.inputs" :key="j">
                <v-avatar color="surface-variant" rounded="lg" size="32">
                  <v-img :src="getItemImage(input.item)" />
                </v-avatar>

                <span>{{ input.quantity }}× {{ input.item }}<span v-if="j < r.inputs.length - 1">, </span>
                </span>
              </div>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
  import type { ItemAndQuantity, ItemEnum, SparkBuilder } from '@/domain/Item'
  import type { ItemInput } from '@/domain/Recipe'
  import { computed, ref } from 'vue'
  import { recipesPerKey } from '@/domain/RecipeFactory'
  import { getBuildingImage, getItemImage } from '@/utils/getImages'
  import { round } from '@/utils/round'

  const props = withDefaults(defineProps<{
    item: ItemAndQuantity
    builder: SparkBuilder
    depth: number
    index?: number
    rateOverride?: number
    ancestors?: ItemEnum[]
  }>(), {
    ancestors: () => [],
  })

  defineEmits(['remove'])

  const expanded = ref(true)
  const recipeIndex = ref(0)
  const dialogOpen = ref(false)

  const outputItem = computed(() => props.item.item)

  /** Detect if this item already appeared in the ancestor chain */
  const isCycle = computed(() => props.ancestors.includes(outputItem.value))

  /** Ancestors to pass down to children (includes current item) */
  const currentAncestors = computed(() => [...props.ancestors, outputItem.value])

  const allRecipes = computed(() => recipesPerKey[props.item.item] ?? [])
  const hasMultipleRecipes = computed(() => allRecipes.value.length > 1)
  const recipe = computed(() => allRecipes.value[recipeIndex.value] ?? null)

  const hasChildren = computed(() => !isCycle.value && recipe.value && recipe.value.inputs.length > 0)

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

  function selectRecipe (index: number) {
    recipeIndex.value = index
    dialogOpen.value = false
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
