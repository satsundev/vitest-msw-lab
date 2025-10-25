<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="bg-black text-white py-4">
    <div class="container mx-auto flex flex-col items-start px-6">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png"
        alt="Swiggy"
        class="h-6 mb-2"
      />
      <p class="text-sm text-gray-400">
        © {{ year }} Bundl Technologies Pvt Ltd
      </p>
    </div>
  </footer>
</template>
