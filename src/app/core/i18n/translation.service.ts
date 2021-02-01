import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Locale } from '~core/models';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private langIds: any = [];

  constructor(private translate: TranslateService ) {
    this.translate.addLangs(['es']);
		this.translate.setDefaultLang('es');
		this.translate.use('es');
  }

  loadTranslations(...args: Locale[]): void {
		const locales = [...args];

		locales.forEach(locale => {
			this.translate.setTranslation(locale.lang, locale.data, true);
			this.langIds.push(locale.lang);
		});

		this.translate.addLangs(this.langIds);
  }

  setLanguage(lang: string) {
		if (lang) {
			this.translate.use(this.translate.getDefaultLang());
			this.translate.use(lang);
			localStorage.setItem('language', lang);
		}
	}

	getSelectedLanguage(): any {
		return localStorage.getItem('language') || 'es';
	}
}
