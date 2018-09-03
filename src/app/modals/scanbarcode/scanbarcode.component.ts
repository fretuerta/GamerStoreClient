import { Component, Inject, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BarecodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

export interface DialogData {
  codigo: string;
}

@Component({
  selector: 'app-scanbarcode',
  templateUrl: './scanbarcode.component.html',
  styleUrls: ['./scanbarcode.component.css']
})
export class ScanbarcodeComponent implements OnInit, OnDestroy {

  @ViewChild(BarecodeScannerLivestreamComponent)
  BarecodeScanner: BarecodeScannerLivestreamComponent;

  constructor(
    public dialogRef: MatDialogRef<ScanbarcodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.BarecodeScanner.start();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onValueChanges(value) {
    console.log('value: ', value);
    this.BarecodeScanner.stop();
    this.dialogRef.close(value.code);
  }

  close() {
    this.BarecodeScanner.stop();
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.BarecodeScanner.stop();
  }
}
