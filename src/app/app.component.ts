import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from './translate/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public supportedLanguages: any[];
  currentLanguage: string;

  langs = [{ value: 'es' },
           { value: 'en' }];

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.currentLanguage = 'es';
    this.updateLanguage();
  }

  updateLanguage() {
    this.translateService.use(this.currentLanguage);
  }
}
