import Vue from 'vue'
import Vuex from 'vuex'
import auxiliarService from './modules/auxiliarService'
import autoresService from './modules/autoresService'
import bloquesService from './modules/bloquesService'
import expedientesService from './modules/expedientesService'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    vue: null,
    loading: false,
    cant_loading: 0,
  },
  mutations: {
      CAMBIAR_LOADING: (state, data) => {
          if (data) {
              state.cant_loading++;
              state.loading = true;
          } else {
              state.cant_loading--;
              state.loading = (state.cant_loading > 0);
          }
      },
      RESET_LOADING: (state, data) => {
          state.cant_loading = 0;
          state.loading = false;
      },
      VUE_INSTANCE: (state, data) => { 
          state.vue = data;
      },
  },
  actions: {
      vue(context, { vm }) {
          context.commit('VUE_INSTANCE', vm);
      }
  },
  getters: {
      absoluteUrlApi : (state) => (relativePath) => {
          return state.vue.absoluteUrlApi(relativePath);
      }
  },
  modules:{
    auxiliar: auxiliarService,
    autores: autoresService,
    bloques: bloquesService,
    expedientes: expedientesService
  }
})