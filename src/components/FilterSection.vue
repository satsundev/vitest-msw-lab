<template>
  <div>
    <!-- Area Heading -->
    <div class="text-xl font-bold text-gray-800 p-4">
      <template v-if="areaStore.isLoading">
        <div class="h-6 w-72 bg-gray-200 shimmer rounded"></div>
      </template>
      <template v-else>
        Restaurants currently delivering in
        <span class="text-orange-500">{{
          areaStore.selectedArea || "..."
        }}</span>
      </template>
    </div>

    <!-- Filter & Sort Section -->
    <div
      class="flex flex-wrap items-center gap-3 p-4 bg-white shadow-sm border-b rounded-lg"
    >
      <template v-if="areaStore.isLoading">
        <div
          v-for="i in 7"
          :key="i"
          class="h-10 w-24 bg-gray-200 shimmer rounded-full"
        ></div>
      </template>

      <template v-else>
        <!-- Filter Button -->
        <div class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-full hover:bg-orange-100 transition-all"
          >
            Filter
            <span
              :class="{ 'rotate-180': showDropdown }"
              class="transition-transform"
              >⬇️</span
            >
          </button>

          <!-- Filter Dropdown -->
          <div
            v-if="showDropdown"
            class="absolute left-0 mt-2 w-60 bg-white p-4 rounded-lg shadow-lg z-20"
            @click.stop
          >
            <h4 class="font-semibold text-gray-700 mb-3">Filter By Area</h4>

            <div class="max-h-40 overflow-y-auto">
              <label
                v-for="area in areaStore.areas"
                :key="area.strArea"
                class="flex items-center mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
              >
                <input
                  type="radio"
                  name="area"
                  :value="area.strArea"
                  v-model="tempSelectedArea"
                  class="accent-orange-500 mr-2"
                />
                {{ area.strArea }}
              </label>
            </div>

            <button
              @click="applyFilter"
              class="w-full bg-orange-500 text-white px-4 py-2 rounded-lg mt-3 hover:bg-orange-600"
            >
              Apply
            </button>
          </div>

          <div
            v-if="showDropdown"
            class="fixed inset-0 z-10"
            @click.self="showDropdown = false"
          ></div>
        </div>

        <!-- Sort By Dropdown -->
        <div>
          <select
            v-model="mealStore.sortOrder"
            class="border border-gray-300 px-4 py-2 rounded-full cursor-pointer hover:bg-orange-100"
          >
            <option value="asc">Sort By: A-Z</option>
            <option value="desc">Sort By: Z-A</option>
          </select>
        </div>

        <!-- Static Filters -->
        <button
          v-for="filter in filters"
          :key="filter"
          class="border border-gray-300 px-4 py-2 rounded-full hover:bg-orange-100"
        >
          {{ filter }}
        </button>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useAreaStore } from "@/stores/area";
import { useMealStore } from "@/stores/meals";

const areaStore = useAreaStore();
const mealStore = useMealStore();
const showDropdown = ref<boolean>(false);
const tempSelectedArea = ref<string>("");

const filters = [
  "Fast Delivery",
  "New on Swiggy",
  "Ratings 4.0+",
  "Pure Veg",
  "Offers",
  "₹300 - ₹600",
  "Less than ₹300",
];

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
  if (showDropdown.value) {
    tempSelectedArea.value = areaStore.selectedArea;
  }
};

const applyFilter = () => {
  areaStore.selectedArea = tempSelectedArea.value;
  showDropdown.value = false;
  mealStore.fetchMeals(); // Fetch meals for the newly selected area
};

onMounted(() => {
  areaStore.fetchAreas();
});
</script>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -500px 0;
  }
  100% {
    background-position: 500px 0;
  }
}

.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 1.5s infinite linear;
}
</style>
