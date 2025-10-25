<script setup>
import AppHeader from "@/components/AppHeader.vue";
import FilterSection from "@/components/FilterSection.vue";
import MealListSection from "@/components/MealListSection.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
  <AppHeader />
  <main>
    <FilterSection />
    <MealListSection />
  </main>
  <AppFooter />
</template>