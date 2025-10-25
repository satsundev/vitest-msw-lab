import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useAreaStore } from "@/stores/area";

export const useMealStore = defineStore("mealStore", () => {
  const areaStore = useAreaStore();
  const meals = ref([]);
  const selectedMeal = ref(null);
  const showModal = ref(false);
  const currentPage = ref(1);
  const itemsPerPage = 12;
  const isLoading = ref(false);
  const sortOrder = ref("asc");

  const fetchMeals = async () => {
    try {
      isLoading.value = true;
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaStore.selectedArea}`
      );
      const data = await response.json();
      meals.value = data.meals || [];
      sortMeals(); // Sort after fetching meals
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const sortMeals = () => {
    meals.value.sort((a, b) => {
      return sortOrder.value === "asc"
        ? a.strMeal.localeCompare(b.strMeal)
        : b.strMeal.localeCompare(a.strMeal);
    });
  };

  const fetchMealDetails = async (id) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      selectedMeal.value = data.meals?.[0] || null;
      showModal.value = true;
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  };

  const closeModal = () => {
    showModal.value = false;
    selectedMeal.value = null;
  };

  const getRandomRating = () => (Math.random() * (5 - 3) + 3).toFixed(1);

  const paginatedMeals = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return meals.value.slice(start, start + itemsPerPage);
  });

  const totalPages = computed(() =>
    Math.ceil(meals.value.length / itemsPerPage)
  );

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };

  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };

  watch(sortOrder, () => {
    sortMeals();
  });

  return {
    meals,
    selectedMeal,
    showModal,
    currentPage,
    itemsPerPage,
    isLoading,
    sortOrder,
    fetchMeals,
    fetchMealDetails,
    getRandomRating,
    paginatedMeals,
    totalPages,
    nextPage,
    prevPage,
    closeModal,
    sortMeals,
  };
});
