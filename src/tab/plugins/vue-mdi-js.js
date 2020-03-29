import Vue from 'vue';
import MdiIcon from '~/BaseComponents/BaseMdiIcon';
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

MdiIcon.add({
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

Vue.component(MdiIcon.name, MdiIcon);
