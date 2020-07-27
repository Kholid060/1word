import franc from 'franc';
import isConv from 'iso-language-converter';
import { supportedLanguages } from './getLang';

function getText() {
  const textTags = 'p, span, h1, h2, h3, h4, h5, h6';
  const textElements = Array.from(document.querySelectorAll(textTags));
  const text = textElements.map(el => el.innerText).join(' ');

  return text;
}

export default function(sampleText) {
  return new Promise(resolve => {
    const languageStorage = localStorage.getItem('oneWord-language');
    if (languageStorage) return resolve(languageStorage);

    const text = sampleText || getText();
    const only = supportedLanguages.map(id => isConv(id, { to: 2 }));
    const language = franc(text, { only });

    if (language === 'und') return resolve(false);

    const langId = isConv(language, { to: 1 });

    localStorage.setItem('oneWord-language', langId);
    resolve(langId);
  });
}
