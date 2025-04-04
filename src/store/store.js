import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    isLoading: false,
    locationDetails: localStorage.getItem('locationDetails') || '', // Восстановление значения из localStorage
  }),
  actions: {
    defineInfoText(text) {
      this.locationDetails = text;
      // Сохраняем locationDetails в localStorage
      localStorage.setItem('locationDetails', text);
    },
  },
});
