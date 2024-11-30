import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/lara';
import { definePreset } from '@primevue/themes';
import 'primeicons/primeicons.css';



// Register components globally
import Button from 'primevue/button';
import Dropdown from 'primevue/button';
import InputText from 'primevue/inputtext';
import IconField  from 'primevue/iconfield';
import InputIcon   from 'primevue/inputicon';
import Select from 'primevue/select';

// import Menubar from 'primevue/menubar';



import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import router from './router/router';
import en from './assets/locales/en.json';
import fr from './assets/locales/fr.json';
import ar from './assets/locales/ar.json';


const i18n = createI18n({
    locale: localStorage.getItem('language') || 'en', 
    messages: {
      en, fr, ar 
    },
  });
const app = createApp(App);
const pinia = createPinia();

const MyPreset = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{indigo.50}',
          100: '{indigo.100}',
          200: '{indigo.200}',
          300: '{indigo.300}',
          400: '{indigo.400}',
          500: '{indigo.500}',
          600: '{indigo.600}',
          700: '{indigo.700}',
          800: '{indigo.800}',
          900: '{indigo.900}',
          950: '{indigo.950}'
      },
      bitbucket: {
        50: '#32577d',
        100: '#32577d',
        200: '#32577d',
        300: '#32577d',
        400: '#32577d',
        500: '#32577d',
        600: '#32577d',
        700: '#32577d',
        800: '#32577d',
        900: '#32577d',
        950: '#32577d'
    }
  }
});

app.use(PrimeVue, {
  theme: {
      preset: MyPreset
  }
});
app.use(pinia);
app.use(router);
app.use(i18n);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Dropdown', Dropdown);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('Select', Select);

app.mount('#app');
