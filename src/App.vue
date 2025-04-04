<template>
  <transition name="fade">
    <UiAlert
      v-if="isAlertActive"
      :text="locationDetails"
      @close-alert="isAlertActive = false"
    />
  </transition>

  <MapView/>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from '@/store/store';
import MapView from '@/components/map/MapView.vue';
import UiAlert from '@/components/UiAlert.vue';

const store = useStore();
const {
  locationDetails,
  isAlertActive,
} = storeToRefs(store);
</script>
