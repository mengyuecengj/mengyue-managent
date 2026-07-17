import { createI18n } from 'vue-i18n';
import zhCN from './lang/zh-CN';
import enUS from './lang/en-US';
const messages = {
    'zh-CN': zhCN,
    'en-US': enUS
};
const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('lang') || 'zh-CN',
    fallbackLocale: 'zh-CN',
    messages
});
export default i18n;
