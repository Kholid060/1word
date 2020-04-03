import Vue from 'vue';
import VueMdijs from 'vue-mdijs';
import {
  mdiHome,
  mdiMagnify,
  mdiPencil,
  mdiNewspaperVariant,
  mdiCog,
  mdiPencilBoxMultiple,
  mdiDelete,
  mdiPlus,
  mdiMinus,
  mdiMessageProcessing,
  mdiChevronDown,
  mdiClose,
  mdiCheck,
  mdiLinkLock,
  mdiLink,
} from '@mdi/js';

VueMdijs.add({
  mdiHome,
  mdiMagnify,
  mdiNewspaperVariant,
  mdiPencil,
  mdiCog,
  mdiPlus,
  mdiMinus,
  mdiPencilBoxMultiple,
  mdiDelete,
  mdiMessageProcessing,
  mdiChevronDown,
  mdiClose,
  mdiCheck,
  mdiLinkLock,
  mdiLink,
});

Vue.use(VueMdijs);
