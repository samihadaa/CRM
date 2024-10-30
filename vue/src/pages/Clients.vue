<template>
    <div class="row d-flex flex-column">
        <div class="row p-3" style="background-color: #f4f2f5">
            <h1 class="page-header ms-4">Clients</h1>
        </div>
        <div class="row p-3" style="background-color: #e7e5e8">
            <div class="col-8">
                <p class="ms-4">
                    Gérez vos clients et leurs soldes de compte, ou triez-les
                    par données démographiques et habitudes de consommation.
                    <a href="#">Besoin d'aide ?</a>
                </p>
            </div>
            <div class="col-4 d-flex align-items-center justify-content-evenly">
                <Button
                    type="button"
                    label="Importer des clients"
                    severity="bitbucket"
                    style="background-color: #32577d"
                ></Button>
                <Button
                    type="button"
                    label="Ajouter un client"
                    severity="primary"
                ></Button>
            </div>
        </div>
        <div class="row p-3" style="background-color: white">
            <div class="col-5 ms-4">
                <label for="search">Rechercher des clients </label>
                <IconField>
                    <InputIcon class="pi pi-search" />
                    <InputText
                        class="w-100"
                        placeholder="Saisissez le nom, les coordonnés ou le code du client"
                    />
                </IconField>
            </div>
            <div class="col-3">
                <label for="group">Groupe de clients </label>
                <div class="card flex justify-center">
                    <Select
                        v-model="selectedCity"
                        :options="cities"
                        optionLabel="name"
                        placeholder="Select a City"
                        checkmark
                        :highlightOnSelect="false"
                        class="w-full md:w-56"
                    />
                </div>
            </div>
            <div class="col-3 d-flex align-items-center mt-3 ms-3">
                <span type="button" style="color: #0d6efd;">Plus de filtres</span>
                <Button
                    class="ms-3"
                    type="button"
                    label="Rechercher"
                    severity="bitbucket"
                    style="background-color: #32577d"
                ></Button>
            </div>
        </div>
        <div class="row" style="background-color: #f4f2f5">
            <div class="col-12 text-center mt-5">
                <p>Créez des profils clients pour garder une trace de l'historique et des coordonnées de vos clients</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedCity = ref();
const cities = ref([
    { name: "Top clients", code: "123" },
    { name: "Best clients", code: "55" },
    { name: "Bad clients", code: "LDN" },
]);
</script>

<style></style>
