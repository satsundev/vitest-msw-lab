import { defineStore } from "pinia";
import { ref } from "vue";

export const useAreaStore = defineStore("areaStore", () => {
  const areas = ref([]);
  const selectedArea = ref("Indian");
  const isLoading = ref(true);
  const sortOrder = ref("asc");

  const fetchAreas = async () => {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
      );
      const data = await res.json();
      areas.value = data.meals || [];
    } catch (error) {
      console.error("Error fetching areas:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const sortMeals = () => {
    areas.value.sort((a, b) =>
      sortOrder.value === "asc"
        ? a.strArea.localeCompare(b.strArea)
        : b.strArea.localeCompare(a.strArea)
    );
  };

  return {
    areas,
    selectedArea,
    isLoading,
    sortOrder,
    fetchAreas,
    sortMeals,
  };
});
