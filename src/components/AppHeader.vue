<template>
  <header class="w-full bg-white border-b border-gray-200 shadow-sm">
    <div
      class="w-full max-w-screen-xl mx-auto p-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
    >
      <!-- Logo Section -->
      <div class="flex items-center justify-center sm:justify-start">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png"
          alt="Swiggy Logo"
          class="h-6 mr-2"
        />
        <span class="text-[#fc8019] font-bold text-lg">SWIGGY</span>
      </div>

      <!-- Search Input -->
      <div
        class="w-full sm:w-[600px] flex items-center bg-gray-100 rounded-md px-3 py-2"
      >
        <input
          type="text"
          placeholder="Search for restaurant and food"
          class="w-full bg-transparent outline-none text-sm"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 text-gray-500"
          viewBox="0 0 24 24"
        >
          <path
            d="M10 2a8 8 0 105.29 14.29l4.4 4.4a1 1 0 001.42-1.42l-4.4-4.4A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"
          />
        </svg>
      </div>
    </div>
  </header>
</template>