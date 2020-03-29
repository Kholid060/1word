import Vue from 'vue';
import MdiIcon from '~/BaseComponents/BaseMdiIcon';
import { mdiHome, mdiMagnify, mdiPower, mdiEarth, mdiPencil, mdiDelete, mdiChevronDown, mdiPlus, mdiClose } from '@mdi/js';

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
