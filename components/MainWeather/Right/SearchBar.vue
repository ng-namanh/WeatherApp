<template>
  <form
    class="flex flex-row items-center p-2 gap-4 w-full h-9 bg-white rounded-md"
    @submit.prevent="searchLocation"
  >
    <svg class="w-4 h-4" viewBox="0 0 18 18" fill="black" fill-opacity="0.54">
      <path
        d="M6.5 0C8.22391 0 9.87721 0.684819 11.0962 1.90381C12.3152 3.12279 13 4.77609 13 6.5C13 8.11 12.41 9.59 11.44 10.73L11.71 11H12.5L17.5 16L16 17.5L11 12.5V11.71L10.73 11.44C9.55055 12.4468 8.05071 12.9999 6.5 13C4.77609 13 3.12279 12.3152 1.90381 11.0962C0.684819 9.87721 0 8.22391 0 6.5C0 4.77609 0.684819 3.12279 1.90381 1.90381C3.12279 0.684819 4.77609 0 6.5 0ZM6.5 2C4 2 2 4 2 6.5C2 9 4 11 6.5 11C9 11 11 9 11 6.5C11 4 9 2 6.5 2Z"
      />
    </svg>
    <input
      type="text"
      placeholder="Search"
      class="text-base font-bold flex-1 bg-transparent outline-none text-black"
      v-model="searchQuery"
    />
  </form>
</template>

<script setup>
import { getForecastWeatherData } from '@/services/weatherService';
import { computed, ref, defineEmits } from 'vue';

const searchQuery = ref('');
const formattedSearchQuery = computed(() => searchQuery.value.trim());
const forecastWeatherData = ref(null);

const emits = defineEmits(['search']);

async function searchLocation() {
  const data = await getForecastWeatherData(formattedSearchQuery.value);
  forecastWeatherData.value = data;
  emits('search', data);
  searchQuery.value = ''
}
</script>

<style lang="scss" scoped></style>
