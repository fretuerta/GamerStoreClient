import { NgModule } from '@angular/core';
import {
  MatTableModule,
  MatMenuModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  exports: [
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class MatComponentsModule { }
