// src/stores/useThemeStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // Theme state
  const darkMode = ref(localStorage.getItem('theme') === 'dark');
  console.log('darkMode.value :', darkMode.value)

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;

    localStorage.setItem('theme', darkMode.value ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode.value);
  };

  return {
    darkMode,
    toggleDarkMode,
  };
});
