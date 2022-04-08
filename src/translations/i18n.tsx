import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './en';
import translationFI from './fi';
import detector from 'i18next-browser-languagedetector';
import loadLanguages from './loadLanguages';
// the translations
const resources = {
  en: {
    translation: loadLanguages('EN'),
  },
  fi: {
    translation: loadLanguages('FI'),
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
