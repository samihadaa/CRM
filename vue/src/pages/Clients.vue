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

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true">
            <div class="flex flex-col gap-6">
                <img v-if="false" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-4" />
                <div>
                    <label for="name" class="block font-bold mb-3">Name</label>
                    <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" fluid />
                    <small v-if="submitted && !product.name" class="text-red-500">Name is required.</small>
                </div>
                <div>
                    <label for="description" class="block font-bold mb-3">Description</label>
                    <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" fluid />
                </div>
                <div>
                    <label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
                    <Select id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status" fluid></Select>
                </div>

                <div>
                    <span class="block font-bold mb-4">Category</span>
                    <div class="grid grid-cols-12 gap-4">
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category1" v-model="product.category" name="category" value="Accessories" />
                            <label for="category1">Accessories</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category2" v-model="product.category" name="category" value="Clothing" />
                            <label for="category2">Clothing</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category3" v-model="product.category" name="category" value="Electronics" />
                            <label for="category3">Electronics</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category4" v-model="product.category" name="category" value="Fitness" />
                            <label for="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="price" class="block font-bold mb-3">Price</label>
                        <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" fluid />
                    </div>
                    <div class="col-span-6">
                        <label for="quantity" class="block font-bold mb-3">Quantity</label>
                        <InputNumber id="quantity" v-model="product.quantity" integeronly fluid />
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveProduct" />
            </template>
        </Dialog>
        
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

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>

    </div>

    <Toolbar class="mb-6">
                <template #start>
                    <Button label="New" icon="pi pi-plus" class="mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" outlined @click="confirmDeleteSelected" :disabled="!selectedCustomer || !selectedCustomer.length" />
                </template>

                <template #end>
                    <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" customUpload chooseLabel="Import" class="mr-2" auto :chooseButtonProps="{ severity: 'secondary' }" />
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

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
            <!-- <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" /> -->
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

<script setup lang="ts">
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
import Toolbar from 'primevue/toolbar';
import FileUpload from 'primevue/fileupload';
import Textarea from 'primevue/textarea';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import RadioButton from 'primevue/radiobutton';

const dialogVisible = ref(false);
const customers = ref();
const deleteProductsDialog = ref(false);

//TO DO: used just for testing the modal
const product = ref({});
const submitted = ref(false);
const productDialog = ref(false);
const products = ref();

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
    CustomerService.getCustomersLarge().then((data: any) => {
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
const formatDate = (value: any) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
const formatCurrency = (value: any) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const clearFilter = () => {
    initFilters();
};
const getCustomers = (data: any) => {
    return [...(data || [])].map((d) => {
        d.date = new Date(d.date);

        return d;
    });
};
const getSeverity = (status: string) => {
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

const onRowSelect = (event: any) => {
    console.log('unmark row ', event);
    // toast.add({ severity: 'info', summary: 'Product Selected', detail: 'Name: ' + event.data.name, life: 3000 });
};
const onRowUnselect = (event: any) => {
    console.log('mark row ', event);
    // toast.add({ severity: 'warn', summary: 'Product Unselected', detail: 'Name: ' + event.data.name, life: 3000 });
}

const onColReorder = () => {
    // toast.add({severity:'success', summary: 'Column Reordered', life: 3000});
};
const onRowReorder = (event: any) => {
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
const onToggle = (val: any) => {
    selectedColumns.value = columns.value.filter(col => val.includes(col));
    console.log('selectedColumns :', selectedColumns.value);
};

const containsField = (fieldName: any)=> {
      return selectedColumns.value.some(column => column.field === fieldName);
    }

    const dt = ref();
const exportCSV = () => {
    dt.value.exportCSV();
};

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const createId = () => {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}
const saveProduct = () => {
    submitted.value = true;

    if (product?.value.name?.trim()) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            // products.value.push(product.value);
            // toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        productDialog.value = false;
        product.value = {};
    }
};
const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    customers.value = customers.value.filter(val => !selectedCustomer.value.includes(val));
    deleteProductsDialog.value = false;
    selectedCustomer.value = null;
    // toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
};

</script>

<style></style>
