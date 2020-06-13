import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DepositService } from 'src/app/services/deposit.service';

@Component({
  selector: 'app-deposit-modal',
  templateUrl: './deposit-modal.component.html'
})
export class DepositModalComponent implements OnInit {
  loading;
  depositForm: FormGroup;
  deposit: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
    private depositService: DepositService,
    private dialogRef: MatDialogRef<DepositModalComponent>
  ) {}

  ngOnInit() {
    this.depositForm = this.formBuilder.group({
      deposit: new FormControl('', [Validators.required])
    });
  }

  get getFormControls() {
    return this.depositForm.controls;
  }

  saveDeposit() {
    this.loading = true;
    this.depositService.saveDeposit(this.deposit).subscribe(res => {
      this.dialogRef.close('deposit saved');
      this.loading = false;
    });
  }
}
