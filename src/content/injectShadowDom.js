import styleString from '~/assets/scss/style.scss';

const shadowElement = document.createElement('div');
shadowElement.attachShadow({ mode: 'open' });
shadowElement.classList = 'oneWord-element';

const styleEl = document.createElement('style');
styleEl.innerText = styleString;
shadowElement.shadowRoot.appendChild(styleEl);

document.body.appendChild(shadowElement);

export default function(content) {
  shadowElement.shadowRoot.appendChild(content);

  return shadowElement;
}
