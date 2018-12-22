import { HttpModule } from '@angular/http';
import { LOCALE_ID, NgModule, Component } from '@angular/core';

import { registerLocaleData, APP_BASE_HREF } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');
import { TranslatePipe } from './translate/translate.pipe';
import { TRANSLATION_PROVIDERS } from './translate/translations';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PlataformasComponent } from './plataformas/plataformas.component';
import { JuegosComponent } from './juegos/juegos.component';
import { HomeComponent } from './home/home.component';
import { TranslateService } from './translate/translate.service';
import { FormsModule } from '@angular/forms';
import { ArticulosComponent } from './articulos/articulos.component';
import { MatComponentsModule } from './mat-components.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

import { BarecodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { ClientesComponent } from './clientes/clientes.component';
import { ScanbarcodeComponent } from './modals/scanbarcode/scanbarcode.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material';

const appRoutingProviders: any = [];

@NgModule({
  declarations: [
    TranslatePipe,
    AppComponent,
    PlataformasComponent,
    JuegosComponent,
    HomeComponent,
    ArticulosComponent,
    LoginComponent,
    ClientesComponent,
    ScanbarcodeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatComponentsModule,
    MatDialogModule,
    BarecodeScannerLivestreamModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'plataformas', component: PlataformasComponent },
      { path: 'juegos', component: JuegosComponent },
      { path: 'articulos', component: ArticulosComponent },
      { path: 'clientes', component: ClientesComponent }
    ])
  ],
  entryComponents: [ ScanbarcodeComponent ],
  providers: [
    appRoutingProviders,
    { provide: LOCALE_ID, useValue: 'es'},
    TranslateService,
    TRANSLATION_PROVIDERS,
    TranslatePipe,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
