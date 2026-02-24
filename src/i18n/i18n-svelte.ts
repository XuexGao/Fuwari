import { writable, derived } from 'svelte/store';
import { getLang, setLang as setLangUtil } from '@utils/setting-utils';
import { getTranslation, Lang, Translation } from './translation';

export const lang = writable<string>('zh_CN');

export function initLang() {
    if (typeof window !== 'undefined') {
        const segments = window.location.pathname.split('/').filter(Boolean);
        if (segments[0] === 'en') {
            lang.set('en');
        } else if (segments[0] === 'zh-cn') {
            lang.set('zh_CN');
        } else {
            lang.set(getLang());
        }
    }
}

export function setLang(newLang: string) {
    lang.set(newLang);
    setLangUtil(newLang);
}

export const t = derived(lang, ($lang) => {
    const translations = getTranslation($lang);
    return (key: Translation) => translations[key];
});
