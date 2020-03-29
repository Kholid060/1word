import Popper from 'popper.js';

import popoverContent from '../components/popover';

function handleDocumentEvent(element, popper) {
  document.addEventListener('click', event => {
    const popoverContent = element.querySelectorAll('*');
    const isInclude = Array.from([element, ...popoverContent]).includes(event.target);
    if (!isInclude) {
      popper.destroy();
      document.removeEventListener('click', handleDocumentEvent);
    }
  });
}

export default function(element, type = 'meaning', data) {
  const getAllPopover = document.getElementsByClassName('popover-container-ext');
  if (getAllPopover.length >= 1) {
    getAllPopover.forEach((el, index) => {
      if (index !== getAllPopover.length) getAllPopover[index].parentNode.removeChild(getAllPopover[index]);
    });
  }

  let popper;
  if (popper) popper.destroy();

  const popoverContainer = document.createElement('div');
  popoverContainer.className = `popover-container-ext ${type}`;
  popoverContainer.setAttribute('popover-container', '');
  const popoverContentEl = document.createElement('div');
  popoverContentEl.setAttribute('id', 'popover-content');
  popoverContainer.appendChild(popoverContentEl);
  document.body.appendChild(popoverContainer);

  const popoverOptions = {
    placement: 'bottom',
    removeOnDestroy: true,
    onCreate: () => {
      popoverContent(popper, type, data, element).$mount('#popover-content');
      handleDocumentEvent(popoverContainer, popper);
    },
  };

  if (type === 'meaning') {
    popper = new Popper(element, popoverContainer, popoverOptions);
  } else if (type === 'add') {
    const { clientX, clientY } = element;
    popper = new Popper(
      {
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            top: clientY,
            bottom: clientY,
            left: clientX,
            right: clientX,
          };
        },
      },
      popoverContainer,
      popoverOptions
    );
    popper.disableEventListeners();
  }
}
