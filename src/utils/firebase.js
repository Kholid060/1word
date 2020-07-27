import Auth from 'firebase-auth-lite';
import { storage } from './helper';

export const auth = new Auth({
  apiKey: process.env.API_KEY,
  redirectUri: `${process.env.BASE_URL}/redirect`,
  storage: {
    async set(key, value) {
      return await storage.set('user', JSON.parse(value));
    },
    async get() {
      const { user } = await storage.get('user');
      return JSON.stringify(user || null);
    },
    async remove() {
      return await storage.remove('user');
    },
  },
});

export const request = async (path, init) => {
  return new Promise((resolve, reject) => {
    storage.get('user').then(({ user }) => {
      if (user && auth.user === null) auth.user = user;

      auth
        .authorizedRequest(`https://oneword-api.herokuapp.com/api/v1${path}`, {
          ...init,
          headers: {
            'content-type': 'application/json',
          },
        })
        .then(response => resolve(response.json()))
        .catch(err => reject(err));
    });
  });
};
