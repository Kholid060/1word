import Vue from 'vue';
import { mdiHome, mdiMagnify, mdiPower, mdiEarth, mdiPencil, mdiDelete, mdiChevronDown, mdiPlus, mdiClose } from '@mdi/js';
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
});

Vue.use(VueMdijs);
