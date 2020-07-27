import findandreplacedomtext from './content/findandreplacedomtext';
import addWord from './content/components/addWord';
import popup from './content/components/popup';
import detectLanguage from './utils/detectLanguage';
import { sendMessage, storage, filterWordsByLangId } from './utils/helper';

(async () => {
  const { user } = await storage.get('user');
  if (!user) return popup('login');

  const langId = await detectLanguage();

  if (!langId) return popup('notSupport');

  await sendMessage('currentTabLanguage', {
    langId,
  });
  popup('loadLanguage', langId);

  document.addEventListener('dblclick', event => {
    const text = window
      .getSelection()
      .toString()
      .trim()
      .toLocaleLowerCase();
    const virtualElement = {
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        top: event.clientY + 7,
        right: event.clientX,
        bottom: event.clientY + 7,
        left: event.clientX,
      }),
    };
    const hasOneWordClass = /oneWord-/g.test(event.target.className);

    if (!!text && !hasOneWordClass) addWord(virtualElement, text);
  });

  const { words } = await storage.get('words');
  const mapWordTitle = filterWordsByLangId(words, langId, true);

  if (mapWordTitle.length === 0) return;

  findandreplacedomtext({
    target: document.body,
    words: mapWordTitle,
    langId,
  });
})();
