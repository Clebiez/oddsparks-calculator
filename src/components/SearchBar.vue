<script setup lang="ts">
import { ItemEnum } from '@/domain/Item';
import { ref } from 'vue';

const items = ref(Object.values(ItemEnum).map(item => ({
  label: item,
  icon: 'i-lucide-circle-plus'
})))
let value = null


</script>

<template>
 <USelectMenu
    v-model="value"
    :search-input="{
      placeholder: 'Filter...',
      icon: 'i-lucide-search'
    }"
    :items="items"
    class="w-48"
  />
</template>

<style scoped>

</style>
