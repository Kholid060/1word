import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import { setStorage } from '~/utils/storage';

Vue.use(Vuex);

const database = new VuexORM.Database();

// Get all model inside models folder
const requireModels = require.context('./models', false, /\.js$/);

// Register all model
requireModels.keys().forEach(modelName => {
  database.register(requireModels(modelName).default);
});

const Store = new Vuex.Store({
  plugins: [VuexORM.install(database)],
  state: {
    practice: {
      valid: false,
      length: 10,
    },
    popup: {
      activeMenu: '',
      activeId: 'all',
    },
    blockedWebsite: [],
  },
  mutations: {
    updateState(state, { key, data }) {
      Vue.set(state, key, data);
    },
    blockedWebsite(state, { type, data }) {
      if (type === 'delete') Vue.delete(state.blockedWebsite, data, 1);
      else if (type === 'add') state.blockedWebsite.push(data);

      setStorage('blockedWebsite', state.blockedWebsite);
    },
  },
});

export default Store;
