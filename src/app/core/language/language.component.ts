import { Component } from '@angular/core';
import { LanguageService } from './language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {
  language = 'PT'
  constructor(private languageService: LanguageService) { }

  selectLanguage(language: string) {
    this.language = language
    this.languageService.useLanguage(language.toLowerCase())
  }
}
