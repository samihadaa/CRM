<template>
    <nav
        class="navbar-expand-lg navbar-light row h-100"
        style="background-color: #0b0b0b"
    >
        <div class="col-6 d-flex justify-content-evenly">
            <ul class="navbar-nav mt-lg-0 col-12">
                <li
                    class="nav-item d-flex align-items-center ms-5"
                >
                    <span class="text-white fw-bold">SMOFT RETAIL</span>
                </li>
            </ul>
        </div>
        <div class="h-100 col-6 d-flex align-items-center justify-content-end">
            <div class="me-5 hover-item">
                <span class="text-secondary fw-bold right-header-menu">Help</span>
            </div>
            <div class="me-5 hover-item">
                <BellAlertIcon class="icon-size me-2 text-secondary right-header-menu" />
            </div>
            <div class="me-4 hover-item">
                <span class="text-secondary fw-bold right-header-menu">Sami Khiari</span>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useThemeStore } from "../stores/ThemeStore";
import { BellAlertIcon } from "@heroicons/vue/24/solid";
const theme = useThemeStore();
const { darkMode, toggleDarkMode } = theme;
</script>

<style scoped>
.hover-item {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.right-header-menu:hover {
    color: white !important;
}

.right-header-menu {
    transition: color 0.3s;
}

.icon-size {
    width: 20px;
    height: 20px;
}
</style>
