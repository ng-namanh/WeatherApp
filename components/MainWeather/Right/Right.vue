<template>
  <div>
    <SearchBar @search="handleSearchResult" />
  </div>
  <div class="flex flex-col justify-between relative h-full gap-18">
    <div class="flex justify-between mt-9">
      <div>
        <h1 class="font-semibold text-2xl leading-10">PRECIPITATION</h1>
        <h1 class="font-semibold text-2xl leading-10">HUMIDITY</h1>
        <h1 class="font-semibold text-2xl leading-10">WIND</h1>
      </div>
      <div class="flex flex-col items-end">
        <h1 class="font-light text-2xl leading-10">
          {{ `${forecastOfCurrentDay.day.totalprecip_in}%` }}
        </h1>
        <h1 class="font-light text-2xl leading-10">
          {{ `${forecastOfCurrentDay.day.avghumidity}%` }}
        </h1>
        <h1 class="font-light text-2xl leading-10">
          {{ `${forecastOfCurrentDay.day.maxwind_kph} km/h` }}
        </h1>
      </div>
    </div>
    <div class="h-1/2">
      <div class="flex flex-row w-full items-center justify-center h-full">
        <div
          v-for="(forecastDay, index) in forecastDays"
          :key="index"
          @click="handleDataChange(index)"
        >
          <div
            id="forecastday"
            :class="[
              'cursor-pointer',
              'flex',
              'flex-col',
              'items-center',
              'justify-center',
              'border',
              'bg-[#272E37]',
              'border-transparent',
              'shadow-md',
              'rounded-lg',
              'w-[5.5vw]',
              'h-[16vh]',
              {
                'bg-white': currentDay === index,
                'text-black': currentDay === index,
              },
            ]"
          >
            <div id="format-date">
              {{ formatDateToDayOfWeek(forecastDay.date) }}
            </div>
            <div class="font-semibold text-base">
              {{ `${forecastDay.day.avgtemp_c} °C` }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchBar from './SearchBar.vue';
import { defineProps, ref, defineEmits } from 'vue';
import { format, parseISO } from 'date-fns';
const props = defineProps({
  forecastWeatherData: {
    type: Object,
    required: true,
  },
  forecastOfCurrentDay: {
    type: Object,
    required: true,
  },
  currentDay: {
    type: Number,
    required: true,
  },
});
const forecastDays = ref(props.forecastWeatherData.forecast.forecastday);
const searchResult = ref(null);
const emits = defineEmits(['update-current-day', 'search']);
const handleDataChange = (index) => {
  emits('update-current-day', index);
};
const handleSearchResult = (data) => {
  emits('search', data);
  searchResult.value = data;
  forecastDays.value = data.forecast.forecastday;
};
const formatDateToDayOfWeek = (dateString) => {
  const date = parseISO(dateString);
  const formattedDate = format(date, 'EEE');
  return formattedDate;
};
</script>

<style lang="scss" scoped></style>
