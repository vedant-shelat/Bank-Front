import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WithdrawalService } from 'src/app/services/withdrawal.service';

@Component({
  selector: 'app-withdrawal-modal',
  templateUrl: './withdrawal-modal.component.html'
})
export class WithdrawalModalComponent implements OnInit {
  loading;
  withdrawalForm: FormGroup;
  withdraw: any = {};
  invalidAmount;
  currentUserBalance;
  currentUserId;
  cannotWithdrawMsg;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
    private withdrawalService: WithdrawalService,
    private dialogRef: MatDialogRef<WithdrawalModalComponent>
  ) {}

  ngOnInit() {
    if (this.data) {
      this.currentUserBalance = this.data.balance;
      this.currentUserId = this.data.userId;
    }
    this.withdrawalForm = this.formBuilder.group({
      withdrawal: new FormControl('', [Validators.required])
    });
  }

  get getFormControls() {
    return this.withdrawalForm.controls;
  }

  saveWithdrawal() {
    if (this.withdraw.amount > 0) {
      this.checkWithdrawalAmount();
    } else {
      this.invalidAmount = true;
    }
    setTimeout(() => {
      this.invalidAmount = false;
    }, 3500);
  }

  checkWithdrawalAmount() {
    let withdarawalBalance = this.withdraw.amount;
    if (this.currentUserBalance - withdarawalBalance >= 0) {
      this.loading = true;
      this.withdraw.userId = this.currentUserId;
      this.withdrawalService.saveWithdrawal(this.withdraw).subscribe(res => {
        this.dialogRef.close('withdrawal saved');
        this.loading = false;
      });
    } else {
      this.cannotWithdrawMsg = true;
    }
    setTimeout(() => {
      this.cannotWithdrawMsg = false;
    }, 3500);
  }

  withdrawAllSavings() {
    this.withdraw.amount = this.currentUserBalance;
  }
}
