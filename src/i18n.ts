import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resources from 'virtual:i18next-loader';

i18next.use(I18nextBrowserLanguageDetector).use(initReactI18next).init({
    resources,
    fallbackLng: 'en',
});

export default i18next;
