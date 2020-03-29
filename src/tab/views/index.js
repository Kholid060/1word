import Home from './Home.vue';
import Read from './Read.vue';
import Learn from './Learn.vue';
import Practice from './Practice.vue';
import Settings from './Settings.vue';
import Welcome from './Welcome.vue';

import BlockedWebsite from './Settings/BlockedWebsite.vue';

import store from '~/store';
import LearnModel from '~/store/models/Learn';

export default [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'read',
    path: '/read',
    component: Read,
  },
  {
    name: 'learn',
    path: '/learn/:id',
    component: Learn,
  },
  {
    name: 'settings',
    path: '/settings',
    component: Settings,
    children: [
      {
        name: 'blocked',
        path: 'blocked',
        component: BlockedWebsite,
      },
    ],
  },
  {
    name: 'welcome',
    path: '/welcome',
    component: Welcome,
    beforeEnter: (to, from, next) => {
      if (LearnModel.all().length === 0) next();
      else next('/');
    },
  },
  {
    name: 'practice',
    path: '/practice/:id',
    component: Practice,
    beforeEnter: (to, from, next) => {
      if (!store.state.practice.valid) next(from.path);
      else next();
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];
