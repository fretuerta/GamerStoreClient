import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface HelpData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HelpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HelpData 
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
