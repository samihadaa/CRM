// src/stores/useLanguageStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLanguageStore = defineStore('language', () => {
  // Language state
  const selectedLanguage = ref(localStorage.getItem('language') || 'en');

  const setLanguage = (language: string) => {
    selectedLanguage.value = language;
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
  };

  return {
    selectedLanguage,
    setLanguage,
  };
});
