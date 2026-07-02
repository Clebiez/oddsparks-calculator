<template>
  <v-app>
    <v-main>
      <header>
        <v-app-bar :elevation="3">
          <v-app-bar-title>Oddspark Calculator</v-app-bar-title>

          <template #append>
            <v-btn-toggle v-model="builder">
              <v-btn v-for="item in allBuilder" :key="item" :value="item">
                <img :src="getItemImage(item)" width="50">
              </v-btn>
            </v-btn-toggle>

            <v-btn href="https://github.com/Clebiez/oddspark-calculator" icon="mdi-github" rel="noopener noreferrer" target="_blank" />
          </template>
        </v-app-bar>
      </header>

      <div class="m-4">
        <RecipeForm @on-add-item="onAddItem" @reset="reset" />
        <RecipeResolver :builder="builder" :selected-items="selectedItems" />
      </div>
    </v-main>

    <v-footer class="d-flex flex-col align-center justify-center ga-2 flex-wrap grow py-3 max-h-30" color="surface-light">

      <div class="flex-1-0-100 text-center mt-2">
        <strong>OddSpark Calculator</strong> - v0.1
      </div>

      <div>
        Made with Love by
        <a
          class="text-blue-400 font-bold"
          href="https://clebiez.com"
          rel="noopener noreferrer"
          target="_blank"
          variant="text"
        >Clebiez</a>
      </div>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
  import { ref, type Ref } from 'vue'
  import RecipeForm from './components/RecipeForm.vue'
  import RecipeResolver from './components/RecipeResolver.vue'
  import { type ItemAndQuantity, ItemEnum, type SparkBuilder } from './domain/Item.ts'
  import { getItemImage } from './utils/getImages.ts'

  const selectedItems: Ref<ItemAndQuantity[]> = ref([])

  const allBuilder: SparkBuilder[] = [ItemEnum.Stumpy_Spark, ItemEnum.Crafty_Spark, ItemEnum.Handy_Spark]
  const builder: Ref<SparkBuilder> = ref(ItemEnum.Handy_Spark)
  function onAddItem (payload: ItemAndQuantity) {
    selectedItems.value.push(payload)
  }

  function reset () {
    selectedItems.value = []
  }
</script>
