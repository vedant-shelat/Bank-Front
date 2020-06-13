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
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
    private withdrawalService: WithdrawalService,
    private dialogRef: MatDialogRef<WithdrawalModalComponent>
  ) {}

  ngOnInit() {
    this.withdrawalForm = this.formBuilder.group({
      withdrawal: new FormControl('', [Validators.required])
    });
  }

  get getFormControls() {
    return this.withdrawalForm.controls;
  }

  saveWithdrawal() {
    this.loading = true;
    this.withdrawalService.saveWithdrawal(this.withdraw).subscribe(res => {
      this.dialogRef.close('withdrawal saved');
      this.loading = false;
    });
  }
}
