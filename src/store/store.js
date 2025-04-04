import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    isLoading: false,
    locationDetails: '',
    isAlertActive: false,
  }),
  actions: {
    defineInfoText(text) {
      this.locationDetails = text;
      this.isAlertActive = true;
    },
  },
});
