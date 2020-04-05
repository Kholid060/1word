/**
 * @author Phil Teare
 * using wikipedia data
 */

const languages = {
  es: {
    name: 'Spanish',
    native: 'español',
    country: 'es',
    code: 'es-ES',
  },
  pt: {
    name: 'Portuguese',
    native: 'Português',
    country: 'pt',
    code: 'pt-BR',
  },
  fr: {
    name: 'French',
    native: 'français',
    country: 'fr',
    code: 'fr-FR',
  },
  en: {
    name: 'English',
    native: 'English',
    country: 'us',
    code: 'en-US',
  },
  de: {
    name: 'German',
    native: 'Deutsch',
    country: 'de',
    code: 'de-DE',
  },
  it: {
    name: 'Italian',
    native: 'Italiano',
    country: 'it',
    code: 'it-IT',
  },
  id: {
    name: 'Indonesian',
    native: 'Bahasa Indonesia',
    country: 'id',
    code: 'id-ID',
  },
  tr: {
    name: 'Turkish',
    native: 'Türkçe',
    country: 'tr',
    code: 'tr-TR',
  },
  da: {
    name: 'Danish',
    native: 'dansk',
    country: 'dk',
    code: 'da-DK',
  },
  sv: {
    name: 'Swedish',
    native: 'Svenska',
    country: 'se',
    code: 'sv-SE',
  },
  nl: {
    name: 'Dutch',
    native: 'Nederlands',
    country: 'nl',
    code: 'nl-NL',
  },
};

export const AllLanguage = { ...languages };

export const supportedLanguages = Object.keys(languages);

export function languageFilter(id = '', name = 'name') {
  const countryId = id.toLowerCase();
  if (id && typeof id === 'string') return name === '' ? languages[countryId] : languages[countryId][name];
}
