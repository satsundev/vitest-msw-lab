<template>
  <div class="container mx-auto p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <template v-if="mealStore.isLoading">
        <div
          v-for="n in mealStore.itemsPerPage"
          :key="n"
          class="bg-gray-200 animate-pulse h-56 rounded-2xl"
        ></div>
      </template>
      <template v-else>
        <MealCard
          v-for="meal in mealStore.paginatedMeals"
          :key="meal.idMeal"
          :meal="meal"
        />
      </template>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-6 space-x-3">
      <button
        @click="mealStore.prevPage"
        :disabled="mealStore.currentPage === 1"
        class="px-5 py-2 bg-gray-300 rounded-full disabled:opacity-50"
      >
        ◀ Prev
      </button>
      <span class="px-4 py-2 bg-gray-100 rounded-full"
        >Page {{ mealStore.currentPage }}</span
      >
      <button
        @click="mealStore.nextPage"
        :disabled="mealStore.currentPage === mealStore.totalPages"
        class="px-5 py-2 bg-gray-300 rounded-full disabled:opacity-50"
      >
        Next ▶
      </button>
    </div>

    <!-- Modal Component -->
    <MealModal />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useMealStore } from "@/stores/meals";
import MealCard from "@/components/common/card.vue";
import MealModal from "@/components/common/model.vue";

const mealStore = useMealStore();

onMounted(() => {
  mealStore.fetchMeals();
});
</script>
