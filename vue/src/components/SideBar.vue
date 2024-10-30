<template>
    <div class="d-flex h-100 overflow-hidden col-12">
        <!-- Menu items -->
        <div
            class="sidebar d-flex flex-column align-items-start"
            style="background-color: #e7e5e8"
            :class="collapsed ? '' : 'col-2'"
        >
            <ul class="flex-column w-100 menu-list">
                <li
                    v-for="item in menuItems"
                    :key="item.name"
                    @click="selectMenu(item.name)"
                    class="nav-item menuItem"
                >
                    <RouterLink
                        class="nav-link d-flex align-items-center"
                        :to="item.to"
                    >
                        <component
                            :is="item.icon"
                            class="icon-size me-2 text-black"
                        ></component>
                        <span v-if="!collapsed" class="menu-text">{{
                            item.name
                        }}</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
        <!-- Submenu items -->
        <div
            v-if="selectedMenu"
            class="sidebar col-1 d-flex flex-column align-items-start"
        >
            <ul class="flex-column w-100 submenu bg-white shadow-lg menu-list">
                <li
                    v-for="item in subItems"
                    :key="item.name"
                    class="nav-item subItem"
                >
                    <RouterLink
                        class="nav-link d-flex align-items-center"
                        :to="item.to"
                    >
                        <span class="menu-text">{{ item.name }}</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
        <div class="col">
            <div class="">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
    HomeIcon,
    UsersIcon,
    WrenchScrewdriverIcon,
    Cog6ToothIcon,
    CubeIcon,
} from "@heroicons/vue/24/solid";
const selectedMenu = ref<string>("");
const collapsed = ref<Boolean>(false);
const subItems = ref();

interface menuItems {
    name: string;
    icon: any;
    to: string;
}
const menuItems = ref<menuItems[]>([
    { name: "Home", icon: HomeIcon, to: "/" },
    { name: "Services", icon: WrenchScrewdriverIcon, to: "/services" },
    { name: "Products", icon: CubeIcon, to: "/products" },
    { name: "Clients", icon: UsersIcon, to: "/clients" },
    { name: "Settings", icon: Cog6ToothIcon, to: "/settings" },
]);

interface subItem {
    name: string;
    to: string;
}

const clientItems = ref<subItem[]>([
    { name: "Clients", to: "/clients" },
    { name: "ClientGroups", to: "/clientgroups" },
]);
const settingsItems = ref<subItem[]>([
    { name: "General", to: "/general" },
    { name: "Users", to: "/users" },
    { name: "Security", to: "/security" },
]);

const selectMenu = (item: string) => {
    if (item == "Clients") {
        subItems.value = clientItems.value;
        collapsed.value = true;
        selectedMenu.value = item;
    } else if (item == "Settings") {
        subItems.value = settingsItems.value;
        collapsed.value = true;
        selectedMenu.value = item;
    } else {
        collapsed.value = false;
        selectedMenu.value = "";
    }
};
</script>

<style scoped>
ul {
    list-style-type: none;
}
.subItem:hover {
    background-color: rgb(128 140 255 / 10%);
}
.menuItem:hover {
    background-color: #f4f2f5;
}
.submenu {
    flex-grow: 1;
    padding: 20px;
    transition: all 0.3s;
}
.router-link-exact-active {
    background-color: white;
    border-right: 4px solid #3f32f5;
}
.router-link-exact-active svg {
    color: #3f32f5 !important;
}
.router-link-exact-active span {
    color: #3f32f5;
}
.sidebar {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #0f162a;
    position: relative;
}
.menu-list {
    flex-grow: 1;
    padding: 0;
}
.nav-link {
    display: flex;
    align-items: center;
    padding: 15px;
    color: white;
    transition: color 0.3s ease;
    cursor: pointer;
}
.menu-text {
    opacity: 1;
    transition: opacity 0.3s ease, width 0.3s ease;
    white-space: nowrap;
    color: black;
}
.menu-hidden {
    opacity: 0;
    width: 0;
    overflow: hidden;
    transition: opacity 0.3s ease, width 0.3s ease;
}
.submenu {
    background-color: rgba(255, 255, 255, 0.05);
}
.submenu-link {
    padding: 8px 20px;
    color: #b0bec5;
    transition: color 0.3s ease;
}
.icon-size {
    width: 20px;
    height: 20px;
}
</style>
