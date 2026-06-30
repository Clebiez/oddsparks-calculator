<template>
  <v-app>
    <v-main>
      <header>
        <v-app-bar :elevation="3">
          <v-app-bar-title>Oddspark Calculator</v-app-bar-title>

          <template #append>
            <v-btn icon="mdi-github" />
          </template>
        </v-app-bar>
      </header>

      <div class="m-4">
        <RecipeForm @on-add-item="onAddItem" />
        <RecipeResolver :selected-items="selectedItems" />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import type { ItemAndQuantity } from './domain/Item.ts'
  import { ref, type Ref } from 'vue'
  import RecipeForm from './components/RecipeForm.vue'
  import RecipeResolver from './components/RecipeResolver.vue'

  const selectedItems: Ref<ItemAndQuantity[]> = ref([])

  function onAddItem (payload: ItemAndQuantity) {
    selectedItems.value.push(payload)
  }
</script>
