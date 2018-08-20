import { NgModule } from '@angular/core';
import {
  MatTableModule,
  MatMenuModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  exports: [
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class MatComponentsModule { }
