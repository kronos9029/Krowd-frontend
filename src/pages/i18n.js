import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import  translatioEN  from '../locales/en/translationEN.json';
import  translatioVN  from '../locales/vn/translationVN.json';

const resources = {
    en: {
        translation : translatioEN
    },
    vn: {
        translation : translatioVN
    }
};


i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",

        keySeparator: false,

        interpolation: {
            escapseValue: false
        }
    });

export default i18n;
