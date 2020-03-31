import Vue from 'vue';
import { mdiHome, mdiMagnify, mdiPower, mdiEarth, mdiPencil, mdiDelete, mdiChevronDown, mdiPlus, mdiClose } from '@mdi/js';
import MdiIcon from '~/BaseComponents/BaseMdiIcon';

MdiIcon.add({
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

Vue.component(MdiIcon.name, MdiIcon);
