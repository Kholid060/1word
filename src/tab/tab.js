import Vue from 'vue';
import App from './App';
import store from '../store';
import router from './router';

// Plugin
import './plugins/vue-fontawesome';
import './plugins/v-tooltip';
import './plugins/vue-mdi-js';
import './plugins/vue-toastification';
import './plugins/vuejs-dialog';

// Filter
import { languageFilter } from '../utils/getLang';
Vue.filter('getLang', languageFilter);

// CSS
import '../assets/scss/base/tailwind.scss';
import '../assets/scss/style.scss';
import '../assets/scss/base/font.scss';
import '../assets/scss/base/theme.scss';
import '../assets/scss/components/_loader.scss';
import 'vue2-animate/dist/vue2-animate.min.css';

// UI Components
import '~/BaseComponents';
import '../assets/scss/components/_table.scss';

// Directives
import '../directives/VAutofocus';

global.browser = require('webextension-polyfill');

Vue.prototype.$browser = global.browser;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
