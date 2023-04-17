import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import Detector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(Detector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      lookupQuerystring: 'lang',
    },
  });

export default i18n;
