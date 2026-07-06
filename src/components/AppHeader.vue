<template>
  <v-app-bar color="surface" density="compact" :elevation="0" flat>
    <template #prepend>
      <v-avatar class="ml-2" rounded="0" size="24">
        <v-img alt="Oddsparks Calculator" src="@/assets/logo.png" />
      </v-avatar>
    </template>

    <v-app-bar-title class="text-body-2 font-weight-bold">
      Oddsparks Calculator
    </v-app-bar-title>

    <template #append>
      <v-btn
        icon="mdi-brightness-6"
        size="x-small"
        variant="text"
        @click="$emit('toggle-theme')"
      />

      <v-btn
        href="https://github.com/Clebiez/oddsparks-calculator"
        icon="mdi-github"
        rel="noopener noreferrer"
        size="x-small"
        target="_blank"
        variant="text"
      />
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
  defineEmits(['toggle-theme'])
</script>
