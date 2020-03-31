import { setStorage } from './storage';
import Practice from '~/store/models/Practice';
import Learn from '~/store/models/Learn';
import Word from '~/store/models/Word';

export default async function(key) {
  if (key === 'learns') await setStorage('learns', Learn.all());
  else if (key === 'words') await setStorage('words', Word.all());
  else if (key === 'practices') await setStorage('practices', Practice.all());
}
