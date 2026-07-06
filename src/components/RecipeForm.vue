<template>
  <form class="recipe-form" @submit.prevent="submitItem">
    <v-autocomplete
      v-model="formValues.item"
      auto-select-first
      hide-details
      :items="recipesKey"
      label="Item"
      rounded="pill"
      style="min-width: 260px;"
      variant="solo-filled"
    >
      <template #item="{ props, item }">
        <v-list-item v-bind="props">
          <template #prepend>
            <v-avatar rounded="0" size="28">
              <v-img :src="getItemImage(item as ItemEnum)" />
            </v-avatar>
          </template>
        </v-list-item>
      </template>

      <template #prepend-inner>
        <v-avatar class="mr-1" rounded="0" size="24">
          <v-img :src="getItemImage(formValues.item)" />
        </v-avatar>
      </template>
    </v-autocomplete>

    <v-number-input
      v-model="formValues.quantity"
      control-variant="split"
      hide-details
      label="Quantity"
      :min="1"
      rounded="pill"
      style="max-width: 180px;"
      variant="solo-filled"
    />

    <v-btn
      color="primary"
      icon="mdi-plus"
      rounded="pill"
      size="large"
      type="submit"
      variant="elevated"
    />
  </form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { ItemEnum } from '@/domain/Item'
  import { recipesPerKey } from '@/domain/RecipeFactory'
  import { getItemImage } from '@/utils/getImages'

  const emit = defineEmits(['on-add-item'])

  const recipesKey = Object.keys(recipesPerKey)

  const formValues = ref({
    item: ItemEnum.Stumpy_Spark,
    quantity: 2,
  })

  function submitItem () {
    emit('on-add-item', { ...formValues.value })
  }
</script>

<style scoped>
  .recipe-form {
    display: flex;
    align-items: center;
    gap: 12px;
  }
</style>
