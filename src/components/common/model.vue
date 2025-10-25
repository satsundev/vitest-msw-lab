<template>
  <div
    v-if="mealStore.showModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
    @click.self="mealStore.closeModal"
  >
    <div class="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl relative">
      <button
        @click="mealStore.closeModal"
        class="absolute top-3 right-3 text-gray-500 text-2xl bg-white rounded-full shadow-md p-2"
      >
        ✕
      </button>
      <img
        :src="mealStore.selectedMeal?.strMealThumb"
        :alt="mealStore.selectedMeal?.strMeal"
        class="w-full h-60 object-cover rounded-lg"
      />
      <h2 class="text-xl font-semibold mt-4 text-gray-800">
        {{ mealStore.selectedMeal?.strMeal }}
      </h2>
      <p class="text-sm text-gray-500">
        Category: {{ mealStore.selectedMeal?.strCategory }}
      </p>
      <p class="text-sm text-gray-500">
        Area: {{ mealStore.selectedMeal?.strArea }}
      </p>
      <div
        class="mt-3 text-gray-600 text-sm p-2 border-t border-gray-200 max-h-40 overflow-y-auto"
      >
        {{ mealStore.selectedMeal?.strInstructions }}
      </div>
      <a
        :href="mealStore.selectedMeal?.strSource"
        target="_blank"
        class="text-blue-500 mt-4 inline-block"
        >View Full Recipe</a
      >
    </div>
  </div>
</template>

<script setup>
import { useMealStore } from "@/stores/meals";

const mealStore = useMealStore();
</script>
