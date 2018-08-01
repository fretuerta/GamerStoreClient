import { Injectable, Inject } from '@angular/core';
import { TRANSLATIONS } from './translations';

@Injectable()
export class TranslateService {
    private _currentLang: string;

    constructor(@Inject(TRANSLATIONS) private _translations: any) { }

    public get currentLang() {
        return this._currentLang;
    }

    public use(lang: string): void {
        this._currentLang = lang;
    }

    private translate(key: string): string {
        let translation = key;
        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
            return this._translations[this.currentLang][key];
        }
        return '-';
    }

    public instant(key: string) {
        return this.translate(key);
    }
}