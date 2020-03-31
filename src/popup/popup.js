import Vue from 'vue';
import App from './App';
import store from '../store';

// Plugins
import './plugins/v-tooltip';
import './plugins/vue-mdijs';
import './plugins/vue-toastification';

// Filter
import { languageFilter } from '../utils/getLang';

// Base Components
import Button from '~/BaseComponents/BaseButton';
import Card from '~/BaseComponents/BaseCard.vue';
import Input from '~/BaseComponents/BaseInput';
import List from '~/BaseComponents/BaseList.vue';
import Paginate from '~/BaseComponents/BasePaginate.vue';
import Select from '~/BaseComponents/BaseSelect.vue';
import Textarea from '~/BaseComponents/BaseTextarea.vue';
import Flag from '~/BaseComponents/BaseFlag.vue';

// SCSS
import '../assets/scss/base/tailwind.scss';
import '../assets/scss/style.scss';
import '../assets/scss/base/font.scss';
import '../assets/scss/base/theme.scss';

Vue.filter('getLang', languageFilter);

Vue.component(Flag.name, Flag);
Vue.component(Textarea.name, Textarea);
Vue.component(Select.name, Select);
Vue.component(Paginate.name, Paginate);
Vue.component(List.name, List);
Vue.component(Button.name, Button);
Vue.component(Card.name, Card);
Vue.component(Input.name, Input);

global.browser = require('webextension-polyfill');

Vue.prototype.$browser = global.browser;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
