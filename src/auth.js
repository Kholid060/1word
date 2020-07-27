import { storage } from './utils/helper';

(async () => {
  const { user } = await storage.get('user');
  const localUser = JSON.parse(localStorage.getItem(`Auth:User:${process.env.API_KEY}:default`));

  if (!user) {
    storage.set('user', localUser);
  } else if (user && user.localId !== localUser.localId) {
    await storage.clear();
    await storage.set('user', localUser);
  }
})();
