<template>
  <v-app>
    <AppHeader @toggle-theme="toggleTheme" />

    <v-main>
      <v-container class="py-4" fluid style="max-width: 960px;">
        <!-- Toolbar: builder + form on one line -->
        <div class="d-flex align-center flex-wrap ga-4 mb-6">
          <BuilderSelector v-model="builder" />
          <RecipeForm @on-add-item="onAddItem" />
        </div>

        <!-- Production chain -->
        <ProductionChain
          :builder="builder"
          :selected-items="selectedItems"
          @remove-item="removeItem"
          @reset="reset"
        />
      </v-container>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
  import { ref, type Ref } from 'vue'
  import { useTheme } from 'vuetify'
  import AppFooter from './components/AppFooter.vue'
  import AppHeader from './components/AppHeader.vue'
  import BuilderSelector from './components/BuilderSelector.vue'
  import ProductionChain from './components/ProductionChain.vue'
  import RecipeForm from './components/RecipeForm.vue'
  import { type ItemAndQuantity, ItemEnum, type SparkBuilder } from './domain/Item.ts'

  const theme = useTheme()

  const selectedItems: Ref<ItemAndQuantity[]> = ref([])
  const builder: Ref<SparkBuilder> = ref(ItemEnum.Handy_Spark)

  function onAddItem (payload: ItemAndQuantity) {
    selectedItems.value.push(payload)
  }

  function removeItem (index: number) {
    selectedItems.value.splice(index, 1)
  }

  function reset () {
    selectedItems.value = []
  }

  function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }
</script>
