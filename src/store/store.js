import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    isLoading: false,
    locationDetails: '', // Восстановление значения из localStorage
  }),
  actions: {
    defineInfoText(text) {
      this.locationDetails = text;
    },
  },
});
