import Vue from 'vue';
import { mdiHome, mdiCog, mdiMagnify, mdiPower, mdiEarth, mdiPencil, mdiDelete, mdiChevronDown, mdiPlus, mdiClose } from '@mdi/js';
import VueMdijs from 'vue-mdijs';

VueMdijs.add({
  mdiHome,
  mdiMagnify,
  mdiPower,
  mdiEarth,
  mdiPencil,
  mdiDelete,
  mdiChevronDown,
  mdiPlus,
  mdiClose,
  mdiCog,
});

Vue.use(VueMdijs);
