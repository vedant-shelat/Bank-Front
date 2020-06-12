import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-general-modal',
  templateUrl: './general-modal.component.html',
  styleUrls: ['./general-modal.component.css']
})
export class GeneralModalComponent implements OnInit {
  title;
  text;
  btn;
  constructor(
    private dialogRef: MatDialogRef<GeneralModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {
    if (this.data.btn) {
      this.btn = this.data.btn;
    }
    if (this.data) {
      this.title = this.data.title;
      this.text = this.data.text;
    }
  }

  close(action) {
    this.dialogRef.close(action);
  }
}
