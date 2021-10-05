import 'babel-polyfill';

// require jQuery normally
const $ = require('jquery');

// create global $ and jQuery variables
global.$ = global.jQuery = $;

require('../less/app.less');

 
import Vue from 'vue';
import axios from 'axios';
import store from './store'

import './helpers.js';

window.axios = axios;
//axios.defaults.withCredentials = true;
// Event Bus global
window.events = new Vue();
Object.defineProperty(Vue.prototype, '$moment', {value: moment});
import App from './components/App';
import VueSweetalert2 from 'vue-sweetalert2';
import moment from 'moment';
import VModal from 'vue-js-modal';
import Toasted from 'vue-toasted';
import VTooltip from 'v-tooltip'; // DOC https://github.com/Akryum/v-tooltip#usage
import User from './entities/User';

/* Autocomplete */
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
Vue.use(Autocomplete)

/* Fontawesome */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon);

/* Scroll To */
var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo, {
    container: "body",
    duration: 500,
    easing: "ease",
    offset: -200,
    force: true,
    cancelable: false,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
})

Object.defineProperty(Vue.prototype, '$moment', {value: moment});
Vue.use(VTooltip);
Vue.use(VueSweetalert2, {
    confirmButtonText: 'Cerrar'
});
Vue.use(VModal);
Vue.use(Toasted);

// Install BootstrapVue
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


/** este mixin es global a toda instancia/componente de vue */
Vue.mixin({
    computed: {
        user: {
            get() {
                return this.$root.$data.currentUser
            },

            set(value) {
                this.$root.$data.currentUser = value
            },
        },

        baseUrl: function () {
            if(this.$root.$data.appUrl.includes('localhost') || this.$root.$data.appUrl.includes('local') || this.$root.$data.appUrl.includes('desa') || this.$root.$data.appUrl.includes('192.168.1.176')) {
                return this.$root.$data.appUrl;
            }
            return this.$root.$data.appUrl.replace(/^http:\/\//i, 'https://');
        },

        assetsBasePath: function () {
            return this.$root.$data.assetsPath+"build/";
        },

        alert: function () {
            return this.$root.$data.alertInfo;
        },
    },

    methods: {
        /**
         * Devuelve la URL para cerrar la sesion
         */
        logoutUrl() {
            return `${this.baseUrl}/logout`;
        },

        /**
         * Devuelve la URL para obtener el usuario logeado
         */
        currentUserUrl() {
            return `${this.baseUrl}/currentUser`;
        },

        /**
         * Devuelve la URL absoluta de un controlador
         */
        absoluteUrl(route) {
            return `${this.baseUrl}/${route}`;
        },

        /**
         * Devuelve la URL absoluta de un controlador
         */
        absoluteUrlApi(route) {
            return `${this.baseUrl}/api${route}`;
        },

        /**
         * Devuelve la URL absoluta del websocket
         */
        webSocketUrl() {
            return this.$root.$data.websocket;
        },

        /**
         * Devuelve si esta en modo Desarrollo o Produccion
         */
        isProductionEnv() {
            return (this.$root.$data.env.toUpperCase() == "DEV")? false : true;
        },

        /**
         * Devuelve la URL a un asset (como la funcion de Twig)
         *
         * @param {String} name
         */
        asset(name) {
            return `${this.assetsBasePath}${name}`;
        },

        /**
         * Devuelve el plural, si corresponde de acuerdo al parametro "amount", del string pasado por parametro
         *
         * @param {String} word
         * @param {Number} amount
         */
        pluralize(word, amount) {
            return this.$options.filters.pluralize(word, amount)
        },

    },

    filters: {
        /**
         * Formatea el numero con la máscara #.## %, por ej 5 --> 5.00 %
         *
         * @param {Number} un numero
         */
        percent: (value) => value.toFixed(2) + ' %',

        /**
         * Formatea el numero con la máscara $ #.##, por ej 5 --> $ 5.00
         *
         * @param {Number} un numero
         */
        currency: (value) => '$ ' + value.toFixed(2),

        /**
         * Convierte un Objeto a String, y despues pasa ese string a formato "Capitalize", por ej:
         *
         * "HOLA MUNDO!!" --> "Hola Mundo!!"
         *
         * @param {Object}
         */
        capitalize: (value) => value ? value.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '',

        /**
         * Convierte un Objeto a String, y despues pasa ese string a mayusculas:
         *
         * @param {Object}
         */
        uppercase: (value) => value ? value.toString().toUpperCase() : '',

        /**
         * Devuelve el plural, si corresponde de acuerdo al parametro "amount", del string pasado por parametro
         *
         * @param {String} value
         * @param {Number} amount
         */
        pluralize: (value, amount) => (amount == 1) ? value : value + 'es',

        
        /**
         * Devuelve una fecha con formato
         *
         * @param {String} dateTime
         */
        formatDateTime: (value) => moment(String(value)).format('DD/MM/YYYY hh:mm'),

        /**
         * Devuelve una fecha con formato
         *
         * @param {String} dateTime
         */
        formatDate: (value) => moment(String(value)).format('DD/MM/YYYY'),

        /**
         * Devuelve una hora con formato
         *
         * @param {String} dateTime
         */
        formatTime: (value) => moment(String(value)).format('HH:mm'),
    }
});

Vue.config.keyCodes.e = 65;

new Vue({
    el: '#app',
    store,
    data: {
        currentUser: new User(0,'',[]),
        appUrl: '',
        assetsPath: '',
        websocket: '',
        env: ''
    },

    components: { App },
});
