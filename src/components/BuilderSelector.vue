<template>
  <div class="flex items-center gap-3">
    <div class="text-caption text-medium-emphasis">Builder:</div>

    <v-btn-toggle
      color="primary"
      density="compact"
      mandatory
      :model-value="modelValue"
      rounded="lg"
      variant="outlined"
      @update:model-value="$emit('update:model-value', $event)"
    >
      <v-btn v-for="spark in allBuilders" :key="spark" size="small" :value="spark">
        <v-avatar class="mr-1" rounded="0" size="20">
          <v-img :src="getItemImage(spark)" />
        </v-avatar>

        <span class="text-caption">{{ sparkLabel(spark) }}</span>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script lang="ts" setup>
  import { ItemEnum, type SparkBuilder } from '@/domain/Item'
  import { getItemImage } from '@/utils/getImages'

  defineProps<{
    modelValue: SparkBuilder
  }>()

  defineEmits(['update:model-value'])

  const allBuilders: SparkBuilder[] = [
    ItemEnum.Stumpy_Spark,
    ItemEnum.Crafty_Spark,
    ItemEnum.Handy_Spark,
  ]

  function sparkLabel (spark: SparkBuilder): string {
    switch (spark) {
      case ItemEnum.Stumpy_Spark: { return 'Stumpy ×1'
      }
      case ItemEnum.Crafty_Spark: { return 'Crafty ×1.5'
      }
      case ItemEnum.Handy_Spark: { return 'Handy ×2.5'
      }
      default: { return ''
      }
    }
  }
</script>
