import { InjectionToken } from '@angular/core';

import { LANG_EN_TRANS } from './lang-en'
import { LANG_ES_TRANS } from './lang-es'

export const TRANSLATIONS = new InjectionToken('translations');

const dictionary = {
    ['en']: LANG_EN_TRANS,
    ['es']: LANG_ES_TRANS
}

export const TRANSLATION_PROVIDERS = [
    { provide: TRANSLATIONS, useValue: dictionary }
];