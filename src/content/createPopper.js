import { createPopper } from '@popperjs/core';
import injectShadowDom from './injectShadowDom';

export default function(target, component) {
  const content = new component().$mount();
  const { $el } = content;

  const popper = createPopper(target, $el, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 6],
        },
      },
      {
        name: 'eventListeners',
        options: {
          scroll: false,
        },
      },
    ],
    removeOnDestroy: true,
  });

  const shadowElement = injectShadowDom($el);
  const { shadowRoot } = shadowElement;

  const removePopup = event => {
    const isClickInside = event.target.classList.contains('oneWord-element');

    if (!isClickInside) {
      content.$destroy();
      popper.destroy();
      shadowRoot.removeChild($el);
      document.removeEventListener('click', removePopup);
    }
  };

  document.addEventListener('click', removePopup);
}
