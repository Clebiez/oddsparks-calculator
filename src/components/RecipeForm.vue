<script setup lang="ts">
  import { ref } from 'vue'
  import { ItemEnum } from '@/domain/Item'
  import { recipesPerKey } from '@/domain/RecipeFactory'
  import { getItemImage } from '@/utils/getImages'
  const emit = defineEmits(['on-add-item'])

  const recipesValues = Object.values(recipesPerKey)
  const allRecipesItems = recipesValues.map(recipeValue => recipeValue.output.item)

  const formValues = ref({
    item: ItemEnum.Stumpy_Spark,
    quantity: 2,
  })

  function submitItem (payload: SubmitEvent) {
    payload.preventDefault()
    emit('on-add-item', { ...formValues.value })
  }

</script>

<template>
  <form @submit.prevent="submitItem">
    <v-autocomplete
      v-model="formValues.item"
      :items="allRecipesItems"
      label="Choose an item"
      variant="outlined"
    >
      <template #item="{ props, item }">
        <v-list-item v-bind="props">
          <template #prepend>
            <v-avatar size="46">
              <v-img :src="getItemImage(item)" />
            </v-avatar>
          </template>
        </v-list-item>
      </template>

      <template #prepend-inner>
        <v-avatar size="46">
          <v-img :src="getItemImage(formValues.item)" />
        </v-avatar>
      </template>
    </v-autocomplete>

    <v-number-input
      v-model="formValues.quantity"
      control-variant="default"
      :hide-input="false"
      :inset="false"
      label="Items number"
      :reverse="false"
      variant="outlined"
    />

    <v-btn prepend-icon="mdi-plus" type="submit" variant="tonal">
      Ajouter
    </v-btn>
  </form>
</template>

<style scoped></style>
