<template>
  <div
    class="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer border border-gray-300"
    @click="mealStore.fetchMealDetails(meal.idMeal)"
  >
    <div class="relative">
      <img
        :src="meal.strMealThumb"
        :alt="meal.strMeal"
        class="w-full h-56 object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
      ></div>
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800 truncate">
        {{ meal.strMeal }}
      </h3>
      <p class="text-sm text-gray-500">🌎 {{ meal.strArea }}</p>
      <p class="text-yellow-500 text-sm mt-2 flex items-center">
        ⭐ {{ mealStore.getRandomRating() }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useMealStore } from "@/stores/meals";

const mealStore = useMealStore();

defineProps({
  meal: Object,
});
</script>
