import './assets/main.css'

import { createApp } from 'vue' //Импортируется функция createApp из библиотеки Vue. Она нужна для создания нового экземпляра приложения 
import { createPinia } from 'pinia' //Импортируется функция createPinia из библиотеки Pinia — официального хранилища состояния для Vue 3

import App from './App.vue' //Импортируется корневой компонент App.vue. Это тот самый компонент, внутри которого лежат <router-view>, меню и все остальные страницы
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';

const app = createApp(App) //Создаётся экземпляр приложения на основе корневого компонента App.

app.use(createPinia()) //Подключается плагин Pinia к приложению.
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            //darkModeSelector: 'system',
           darkModeSelector: '.dark-mode',
           cssLayer: false
        },
    },
    license: null, 
});

app.mount('#app')//«Монтирует» приложение в DOM-элемент с идентификатором #app
