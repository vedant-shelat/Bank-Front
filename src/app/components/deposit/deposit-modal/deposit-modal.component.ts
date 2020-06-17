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
  invalidAmount;
  currentUserId;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
    private depositService: DepositService,
    private dialogRef: MatDialogRef<DepositModalComponent>
  ) {}

  ngOnInit() {
    if (this.data) {
      this.currentUserId = this.data.userId;
    }
    this.depositForm = this.formBuilder.group({
      deposit: new FormControl('', [Validators.required])
    });
  }

  get getFormControls() {
    return this.depositForm.controls;
  }

  saveDeposit() {
    this.checkAmount();
  }

  checkAmount() {
    if (this.deposit.amount > 0) {
      this.loading = true;
      this.deposit.userId = this.currentUserId;
      this.depositService.saveDeposit(this.deposit).subscribe(res => {
        this.dialogRef.close('deposit saved');
        this.loading = false;
      });
    } else {
      this.invalidAmount = true;
    }
    setTimeout(() => {
      this.invalidAmount = false;
    }, 3500);
  }
}
