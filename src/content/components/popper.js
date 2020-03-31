import Vue from 'vue';
import { createPopper } from '@popperjs/core';
import Popover from './popover.vue';

function handleDocumentEvent(elementContainer) {
  return new Promise(resolve => {
    document.addEventListener('click', event => {
      const elementChilds = elementContainer.querySelectorAll('*');
      const isInclude = Array.from([elementContainer, ...elementChilds]).includes(event.target);

      if (!isInclude) {
        document.removeEventListener('click', handleDocumentEvent);
        resolve();
      }
    });
  });
}

export default function(target, type, text) {
  let popper;
  const popoverEl = document.getElementById('oneWord-popover');
  const popperOptions = {
    removeOnDestroy: true,
    onFirstUpdate: state => {
      popoverEl.innerHTML = '<div id="oneWord-popover--instance"></div>';

      Vue.productionTip = false;
      Vue.prototype.data = {
        type,
        text,
        element: {
          popper,
          popoverEl,
        },
      };
      const vm = new Vue({
        el: '#oneWord-popover--instance',
        render: h => h(Popover),
      });

      handleDocumentEvent(popoverEl).then(() => {
        popper.destroy();
        vm.$destroy();
        if (target.classList) target.classList.remove('open');
        popoverEl.innerHTML = '';
      });
    },
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
      {
        name: 'eventListeners',
        options: {
          scroll: false,
        },
      },
    ],
  };

  popper = createPopper(target, popoverEl, popperOptions);

  return popper;
}
