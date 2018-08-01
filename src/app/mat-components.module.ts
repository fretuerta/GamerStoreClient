import { NgModule } from '@angular/core';
import { MatTableModule, MatMenuModule, MatButtonModule, MatSelectModule } from '@angular/material';

@NgModule({
  exports: [
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class MatComponentsModule { }
