<template>
  <div class="flex flex-col justify-between">
    <div>
      <h1 class="font-semibold text-3xl leading-10">
        {{ formattedDayOfWeek }}
      </h1>
      <h1 class="font-medium text-xl leading-10">
        {{ formattedDate }}
      </h1>
      <h3 class="font-medium flex gap-3">
        <svg
          width="21"
          height="24"
          viewBox="0 0 21 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.15625 10.25C5.15625 7.29873 7.54873 4.90625 10.5 4.90625C13.4513 4.90625 15.8437 7.29873 15.8437 10.25C15.8437 13.2013 13.4513 15.5938 10.5 15.5938C7.54873 15.5938 5.15625 13.2013 5.15625 10.25ZM10.5 6.59375C8.48071 6.59375 6.84375 8.23071 6.84375 10.25C6.84375 12.2693 8.48071 13.9062 10.5 13.9062C12.5193 13.9062 14.1562 12.2693 14.1562 10.25C14.1562 8.23071 12.5193 6.59375 10.5 6.59375Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.964906 8.96396C1.36352 4.12802 5.4047 0.40625 10.257 0.40625H10.743C15.5953 0.40625 19.6365 4.12802 20.0351 8.96396C20.2492 11.5617 19.4468 14.1413 17.7968 16.1591L12.4046 22.7537C11.4202 23.9575 9.57978 23.9575 8.5954 22.7537L3.20321 16.1591C1.55322 14.1413 0.750775 11.5617 0.964906 8.96396ZM10.257 2.09375C6.28293 2.09375 2.97317 5.14191 2.6467 9.10259C2.46849 11.2647 3.13634 13.4115 4.50958 15.091L9.90178 21.6855C10.211 22.0636 10.789 22.0636 11.0982 21.6855L16.4904 15.091C17.8637 13.4115 18.5315 11.2647 18.3533 9.10259C18.0268 5.14191 14.7171 2.09375 10.743 2.09375H10.257Z"
            fill="white"
          />
        </svg>

        {{
          `${forecastWeatherData.location.name}, ${forecastWeatherData.location.country}`
        }}
      </h3>
    </div>
    <div>
      
      <h1 class="font-semibold text-4xl leading-10">{{ `${forecastOfCurrentDay.day.avgtemp_c} °C` }}</h1>
      <h2 class="font-medium text-2xl leading-10 mt-4">{{ forecastOfCurrentDay.day.condition.text }}</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';
import useDateUtils from '@/composables/useDateUtils';
const props = defineProps({
  forecastWeatherData: {
    type: Object,
    required: true,
  },
  forecastOfCurrentDay: {
    type: Object,
    required: true,
  },
});
const { formatDateToDayOfWeek, formatDate } = useDateUtils();
const dateString = ref(props.forecastOfCurrentDay.date);

const formattedDayOfWeek = computed(() => {
  return formatDateToDayOfWeek(dateString.value);
});
const formattedDate = computed(() => {
  return formatDate(dateString.value);
});

watch(
  () => props.forecastOfCurrentDay.date,
  (newValue) => {
    dateString.value = newValue;
  }
);
</script>

<style lang="scss" scoped></style>
