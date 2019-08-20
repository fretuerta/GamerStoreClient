//import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { VentasComponent } from './ventas/ventas.component';
import { AlquileresComponent } from './alquileres/alquileres.component';

import { BarecodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { ClientesComponent } from './clientes/clientes.component';
import { ScanbarcodeComponent } from './modals/scanbarcode/scanbarcode.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FacturasComponent } from './facturas/facturas.component';
import { HelpComponent } from './modals/help/help.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthGuard } from './auth/auth.guard';

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
    ScanbarcodeComponent,
    VentasComponent,
    AlquileresComponent,
    FacturasComponent,
    HelpComponent,
    SignupComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
//    HttpModule,
    MatComponentsModule,
    DragDropModule,
    MatDialogModule,
    BarecodeScannerLivestreamModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'plataformas', component: PlataformasComponent, canActivate: [AuthGuard] },
      { path: 'juegos', component: JuegosComponent, canActivate: [AuthGuard] },
      { path: 'articulos', component: ArticulosComponent, canActivate: [AuthGuard] },
      { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
      { path: 'ventas', component: VentasComponent, canActivate: [AuthGuard] },
      { path: 'alquileres', component: AlquileresComponent, canActivate: [AuthGuard] },
      { path: 'facturas', component: FacturasComponent, canActivate: [AuthGuard] }
    ])
  ],
  entryComponents: [ ScanbarcodeComponent, HelpComponent ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    appRoutingProviders,
    { provide: LOCALE_ID, useValue: 'es'},
    TranslateService,
    TRANSLATION_PROVIDERS,
    TranslatePipe,
    AuthGuard,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
