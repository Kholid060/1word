import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './views';
import store from '~/store';
import Learn from '~/store/models/Learn';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

export default router;
