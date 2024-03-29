import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationAR from './assets/locales/ar/translation.json';
import translationEL from './assets/locales/el/translation.json';
import translationEN from './assets/locales/en/translation.json';
import translationTR from './assets/locales/tr/translation.json';

// the translations
const resources = {
  ar: {
    translation: translationAR
  },
  el: {
    translation: translationEL
  },
  en: {
    translation: translationEN
  },
  tr: {
    translation: translationTR
  }
};

i18n
  // .use(Backend) // load translations using http (default public/assets/locals/en/translations)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    resources,
    lng: "en",
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
