<template>
  <div>
    <div
      v-if="isLoading"
      class="flex items-center justify-center h-screen text-white"
    >
      <div class="loading-spinner"></div>
    </div>
    <div
      v-else
      class="flex items-center justify-center h-screen text-white z-20"
    >
      <div
        class="bg-[#1E1E1E] h-1/2 w-[41vw] flex justify-around items-center border border-solid border-transparent rounded-3xl relative"
      >
        <div
          class="flex items-center justify-center background-linear-gradient rounded-2xl absolute h-[110%] w-1/2 -top-5 -left-16"
        >
          <div class="mx-auto my-0 absolute w-4/5 h-4/5 flex justify-betw">
            <Left
              v-if="!error"
              :forecastWeatherData="forecastWeatherData"
              :forecastOfCurrentDay="forecastOfCurrentDay"
            />
            <div v-if="error">Failed to fetch forecast data.</div>
          </div>
        </div>
        <div class="absolute w-1/2 right-8 h-4/5">
          <Right
            v-if="!error"
            :forecastWeatherData="forecastWeatherData"
            :forecastOfCurrentDay="forecastOfCurrentDay"
            :currentDay="currentDay"
            @update-current-day="currentDay = $event"
            @search="handleSearchResult"
          />
          <div v-if="error">Failed to fetch forecast data.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<script setup>
import Left from '~/components/MainWeather/Left/Left.vue';
import Right from '~/components/MainWeather/Right/Right.vue';
import { getForecastWeatherData } from '@/services/weatherService';
import { ref, onMounted, defineEmits, computed } from 'vue';

const forecastWeatherData = ref({});
const isLoading = ref(true);
const error = ref(false);
const currentDay = ref(0);

const forecastOfCurrentDay = computed(() => {
  if (forecastWeatherData.value && forecastWeatherData.value.forecast) {
    return forecastWeatherData.value.forecast.forecastday[currentDay.value];
  }
  return null;
});

async function fetchForecastWeatherData() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    forecastWeatherData.value = await getForecastWeatherData('Hanoi');
    isLoading.value = false;
  } catch (error) {
    console.log(error);
    isLoading.value = false;
    error.value = true;
  }
}
const handleSearchResult = (data) => {
  forecastWeatherData.value = data;
  currentDay.value = 0;
};
onMounted(fetchForecastWeatherData);
</script>
