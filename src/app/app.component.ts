import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from './translate/translate.service';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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

  userIsAuthenticated = false;
  userName = "";
  private authListenerSubs: Subscription;
  
  constructor(private translateService: TranslateService,
              private authService: AuthService,
              protected router: Router) { }

  ngOnInit(): void {
    this.currentLanguage = 'es';
    this.updateLanguage();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe( (isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated.authenticated;
        this.userName = isAuthenticated.email;
      });
    this.authService.autoAuthUser();
  }

  updateLanguage() {
    this.translateService.use(this.currentLanguage);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
