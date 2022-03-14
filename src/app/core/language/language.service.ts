import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { Translate } from 'src/app/shared/models/translate';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  onChance = new Subject()
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['pt', 'en'])
    this.translate.setDefaultLang('pt')
    this.translate.use('pt')
  }

  useLanguage(language: string) {
    this.translate.use(language)
    this.onChance.next(true)
  }

  getNow(name: string) {
    return this.translate.instant(name)
  }

  getCurrency() {
    return this.translate.get('currency')
  }

  getTranslation(): Observable<Translate> {
    const language = this.translate.currentLang
    const result = this.translate.getTranslation(language)
    return result
  }
}
