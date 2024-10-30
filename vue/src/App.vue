<template>
  <div class="app-layout">
      <!-- Header -->
      <header class="header">
          <Header />
      </header>

      <!-- Main Content (Sidebar + Content) -->
      <div class="main-content">
          <SideBar />
         
      </div>
  </div>
</template>
<script lang="ts" setup>
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
import { onMounted } from "vue";
import { useThemeStore } from "./stores/ThemeStore";
import { useLanguageStore } from "./stores/LanguageStore";

const themeStore = useThemeStore();
const languageStore = useLanguageStore();

onMounted(() => {
    if (themeStore.darkMode) {
        document.documentElement.classList.add("dark");
    }
    languageStore.setLanguage(languageStore.selectedLanguage);
});
</script>
<style>
/* App Layout */
.app-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

/* Fixed Header */
.header {
    height: 60px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background-color: white;
    border-bottom: 1px solid #e0e0e0;
    flex-shrink: 0;
}

/* Main Content Layout (below the header) */
.main-content {
    display: flex;
    /* height: calc(100vh - 60px);  */
    padding-top: 60px;
    overflow-y: hidden;
}

/* Sidebar */
.SideBar {
    width: 250px;
    background-color: #f8f9fa;
    height: 100%;
    overflow-y: auto;
}

/* Main Content */
.content {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
}
</style>
