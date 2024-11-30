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
                <Button type="button" label="Importer des clients" severity="bitbucket"
                    style="background-color: #32577d"></Button>
                <Button type="button" label="Ajouter un client" severity="primary"></Button>
            </div>
        </div>
        <div class="row p-3" style="background-color: white">
            <div class="col-5 ms-4">
                <label for="search">Rechercher des clients </label>
                <IconField>
                    <InputIcon class="pi pi-search" />
                    <InputText class="w-100" placeholder="Saisissez le nom, les coordonnés ou le code du client" />
                </IconField>
            </div>
            <div class="col-3">
                <label for="group">Groupe de clients </label>
                <div class="card flex justify-center">
                    <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City"
                        checkmark :highlightOnSelect="false" class="w-full md:w-56" />
                </div>
            </div>
            <div class="col-3 d-flex align-items-center mt-3 ms-3">
                <span type="button" style="color: #0d6efd;">Plus de filtres</span>
                <Button class="ms-3" type="button" label="Rechercher" severity="bitbucket"
                    style="background-color: #32577d"></Button>
            </div>
        </div>
        <div class="row" style="background-color: #f4f2f5">
            <div class="col-12 text-center mt-5">

    <div class="card col-1 ms-3">
        <Button label="Afficher" icon="pi pi-external-link" @click="dialogVisible = true" />

        <Dialog v-model:visible="dialogVisible" header="Flex Scroll" :style="{ width: '75vw' }" maximizable modal :contentStyle="{ height: '300px' }">
            <DataTable :value="customers" scrollable scrollHeight="flex" tableStyle="min-width: 50rem">
                <Column field="name" header="Nom"></Column>
                <Column field="country.name" header="Pays"></Column>
                <Column field="representative.name" header="Agent"></Column>
                <Column field="company" header="Company"></Column>
            </DataTable>
            <template #footer>
                <Button label="Ok" icon="pi pi-check" @click="dialogVisible = false" />
            </template>
        </Dialog>
    </div>

                <!-- <p>Créez des profils clients pour garder une trace de l'historique et des coordonnées de vos clients</p> -->

                <DataTable  ref="dt" removableSort stripedRows v-model:filters="filters"  v-model:selection="selectedCustomer"
                resizableColumns columnResizeMode="expand" showGridlines 
                stateStorage="session" stateKey="dt-state-demo-session"
                    :value="customers" paginator  :rows="10" dataKey="id" filterDisplay="menu"
                    :reorderableColumns="true" @columnReorder="onColReorder" @rowReorder="onRowReorder"
                    @rowSelect="onRowSelect" @rowUnselect="onRowUnselect"
                    :globalFilterFields="['name', 'country.name', 'representative.name', 'balance', 'status']">
                    <template #header>

                        <div class="text-end pb-4">
            <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
        </div>

                        <div style="text-align:left">
                    <MultiSelect :modelValue="selectedColumns" :options="columns" optionLabel="header" @update:modelValue="onToggle"
                        display="chip" placeholder="Select Columns" />
                </div>
                        <div class="d-flex justify-content-between">
                            <Button type="button" icon="pi pi-filter-slash" label="Rafraîchir" outlined
                                @click="clearFilter()" />
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText v-model="filters['global'].value" placeholder="Rechercher..." />
                            </IconField>
                        </div>
                    </template>
                    <template #empty> No customers found. </template>
                    <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="false" />

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column v-if="containsField('name')" field="name" header="Name" sortable style="min-width: 14rem">
                        <template #body="{ data }">
                            {{ data.name }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
                        </template>
                    </Column>
                    <!-- <Column header="Country" sortable sortField="country.name" filterField="country.name"
                        style="min-width: 14rem">
                        <template #body="{ data }">
                            <div class="flex items-center gap-2">
                                <img alt="flag"
                                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                    :class="`flag flag-${data.country.code}`" style="width: 24px" />
                                <span>{{ data.country.name }}</span>
                            </div>
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" placeholder="Search by country" />
                        </template>
                    </Column> -->
                    <Column v-if="containsField('agent')"  field="agent" header="Agent" sortable sortField="representative.name" filterField="representative"
                        :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                        <template #body="{ data }">
                            <div class="flex items-center gap-2">
                                <img :alt="data.representative.name"
                                    :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`"
                                    style="width: 32px" />
                                <span>{{ data.representative.name }}</span>
                            </div>
                        </template>
                        <template #filter="{ filterModel }">
                            <MultiSelect v-model="filterModel.value" :options="representatives" optionLabel="name"
                                placeholder="Any">
                                <template #option="slotProps">
                                    <div class="flex items-center gap-2">
                                        <img :alt="slotProps.option.name"
                                            :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`"
                                            style="width: 32px" />
                                        <span>{{ slotProps.option.name }}</span>
                                    </div>
                                </template>
                            </MultiSelect>
                        </template>
                    </Column>
                    <Column v-if="containsField('date')" field="date" header="Date" sortable filterField="date" dataType="date"
                        style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatDate(data.date) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <DatePicker v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                        </template>
                    </Column>
                    <Column v-if="containsField('balance')" field="balance" header="Balance" sortable filterField="balance" dataType="numeric"
                        style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                        </template>
                    </Column>
                    <Column v-if="containsField('status')" header="Status" field="status" sortable :filterMenuStyle="{ width: '14rem' }"
                        style="min-width: 12rem">
                        <template #body="{ data }">
                            <Tag :value="data.status" :severity="getSeverity(data.status)" />
                        </template>
                        <template #filter="{ filterModel }">
                            <Select v-model="filterModel.value" :options="statuses" placeholder="Select One" showClear>
                                <template #option="slotProps">
                                    <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                                </template>
                            </Select>
                        </template>
                    </Column>
                    <!-- <Column field="activity" header="Activity" sortable :showFilterMatchModes="false"
                        style="min-width: 12rem">
                        <template #body="{ data }">
                            <ProgressBar :value="data.activity" :showValue="false" style="height: 6px"></ProgressBar>
                        </template>
                        <template #filter="{ filterModel }">
                            <Slider v-model="filterModel.value" range class="m-4"></Slider>
                            <div class="flex items-center justify-between px-2">
                                <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                                <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
                            </div>
                        </template>
                    </Column> -->
                    <Column headerStyle="width: 5rem; text-align: center"
                        bodyStyle="text-align: center; overflow: visible">
                        <template #body>
                            <Button type="button" icon="pi pi-cog" rounded />
                        </template>
                    </Column>
                </DataTable>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CustomerService } from '../service/CustomerService.js';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import Tag from 'primevue/tag';
import MultiSelect from 'primevue/multiselect';
import DatePicker from 'primevue/datepicker';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';

const dialogVisible = ref(false);
const customers = ref();
const selectedCustomer = ref();
const filters = ref();
const representatives = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
]);
const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);

onMounted(() => {
    CustomerService.getCustomersLarge().then((data) => {
        customers.value = getCustomers(data);
    });
});
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: [0, 100], matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
};

initFilters();
const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const clearFilter = () => {
    initFilters();
};
const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
        d.date = new Date(d.date);

        return d;
    });
};
const getSeverity = (status) => {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warn';

        case 'renewal':
            return null;
    }
};
const selectedCity = ref();
const cities = ref([
    { name: "Top clients", code: "123" },
    { name: "Best clients", code: "55" },
    { name: "Bad clients", code: "LDN" },
]);

const onRowSelect = (event) => {
    console.log('unmark row ');
    // toast.add({ severity: 'info', summary: 'Product Selected', detail: 'Name: ' + event.data.name, life: 3000 });
};
const onRowUnselect = (event) => {
    console.log('mark row ');
    // toast.add({ severity: 'warn', summary: 'Product Unselected', detail: 'Name: ' + event.data.name, life: 3000 });
}

const onColReorder = () => {
    // toast.add({severity:'success', summary: 'Column Reordered', life: 3000});
};
const onRowReorder = (event) => {
    customers.value = event.value;
    // toast.add({severity:'success', summary: 'Rows Reordered', life: 3000});
};

const columns = ref([
    {field: 'name', header: 'Name'},
    {field: 'date', header: 'Date'},
    {field: 'agent', header: 'Agent'},
    {field: 'balance', header: 'Balance'},
    {field: 'status', header: 'Status'},
]);
const selectedColumns = ref(columns.value);
const onToggle = (val) => {
    selectedColumns.value = columns.value.filter(col => val.includes(col));
    console.log('selectedColumns :', selectedColumns.value);
};

const containsField = (fieldName)=> {
      return selectedColumns.value.some(column => column.field === fieldName);
    }

    const dt = ref();
const exportCSV = () => {
    dt.value.exportCSV();
};
</script>

<style></style>
