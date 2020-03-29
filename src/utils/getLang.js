/**
 * @author Phil Teare
 * using wikipedia data
 */

const languages = {
  es: {
    name: 'Spanish',
    native: 'español',
    country: 'es',
  },
  pt: {
    name: 'Portuguese',
    native: 'Português',
    country: 'pt',
  },
  fr: {
    name: 'French',
    native: 'français',
    country: 'fr',
  },
  en: {
    name: 'English',
    native: 'English',
    country: 'us',
  },
  de: {
    name: 'German',
    native: 'Deutsch',
    country: 'de',
  },
  it: {
    name: 'Italian',
    native: 'Italiano',
    country: 'it',
  },
  id: {
    name: 'Indonesian',
    native: 'Bahasa Indonesia',
    country: 'id',
  },
  tr: {
    name: 'Turkish',
    native: 'Türkçe',
    country: 'tr',
  },
  da: {
    name: 'Danish',
    native: 'dansk',
    country: 'dk',
  },
  sv: {
    name: 'Swedish',
    native: 'Svenska',
    country: 'se',
  },
  nl: {
    name: 'Dutch',
    native: 'Nederlands',
    country: 'nl',
  },
};

export const AllLanguage = { ...languages };

export const supportedLanguages = Object.keys(languages);

export function languageFilter(id = '', name = 'name') {
  const countryId = id.toLowerCase();
  if (id && typeof id === 'string') return name === '' ? languages[countryId] : languages[countryId][name];
}
