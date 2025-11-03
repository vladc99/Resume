import { createApp } from 'vue'
import App from './App.vue'
import Aura from '@primeuix/themes/aura';
import './assets/background.css'
import './assets/theme.css'

const app = createApp(App);

import "/node_modules/primeflex/primeflex.css"
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';

app.use(PrimeVue, {
    theme: {
        preset: Aura,
    }
});

import Sidebar from "primevue/sidebar";
app.use(Sidebar);

import ConfirmationService from "primevue/confirmationservice";
app.use(ConfirmationService);

import ToastService from "primevue/toastservice";
app.use(ToastService);

import DialogService from "primevue/dialogservice";
app.use(DialogService);

import router from './routes/router';
app.use(router);

app.mount('#app')