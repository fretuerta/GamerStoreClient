import { HomeComponent } from './home/home.component';
import { JuegosComponent } from './juegos/juegos.component';
import { PlataformasComponent } from './plataformas/plataformas.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticulosComponent } from './articulos/articulos.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'plataformas', component: PlataformasComponent },
    { path: 'juegos', component: JuegosComponent },
    { path: 'articulos', component: ArticulosComponent }
];

export const appRoutingProviders: any = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);