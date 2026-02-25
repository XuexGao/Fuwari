import { en } from './languages/en';
import { zh_CN } from './languages/zh_CN';
import { Translation } from './enum';

export { Translation };

export type TranslationMap = {
    [key in Translation]: string;
};

export enum Lang {
    en = 'en',
    zh_CN = 'zh_CN',
}

const translations: Record<Lang, TranslationMap> = {
    [Lang.en]: en,
    [Lang.zh_CN]: zh_CN,
};

export function getTranslation(lang: string | undefined): TranslationMap {
    if (lang === 'en') return translations[Lang.en];
    if (lang === 'zh-cn' || lang === 'zh_CN') return translations[Lang.zh_CN];
    return translations[Lang.zh_CN];
}

export function getTranslationKey(text: string): Translation | undefined {
    const entry = Object.entries(zh_CN).find(([_, value]) => value === text);
    return entry ? (Number(entry[0]) as Translation) : undefined;
}

export function i18n(key: Translation, lang: string | undefined): string {
    return getTranslation(lang)[key];
}

export function translate(text: string, lang: string | undefined): string {
    const key = Object.keys(zh_CN).find(k => (zh_CN as any)[k] === text);
    if (key !== undefined) {
        return (getTranslation(lang) as any)[key];
    }
    return text;
}
