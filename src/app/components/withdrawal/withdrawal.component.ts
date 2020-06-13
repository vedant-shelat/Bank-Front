import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, PageEvent, MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { WithdrawalService } from 'src/app/services/withdrawal.service';
import * as _ from 'lodash';
import { AppConstants } from 'src/app/app.constant';
import { WithdrawalModalComponent } from './withdrawal-modal/withdrawal-modal.component';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {
  currentUserBalance;
  withdrawnAddedMsg;
  totalWithdrawns;
  withdrawals = new MatTableDataSource([]);
  displayedColumns = ['date', 'amount'];
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };
  constructor(
    private dialog: MatDialog,
    private withdrawalService: WithdrawalService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAllWithdrawals();
    this.getCurrentUser();
  }

  getAllWithdrawals() {
    const pager = {
      page: this.pageEvent.pageIndex,
      size: this.pageEvent.pageSize
    };
    this.withdrawalService.getAllWithdrawals(pager).subscribe((res: any) => {
      this.totalWithdrawns = res.length;
      this.withdrawals = new MatTableDataSource(res.withdrawals);
    });
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe((res: any) => {
      this.currentUserBalance = res.balance;
    });
  }

  withdraw() {
    const config = _.cloneDeep(AppConstants.DIALOG_CONFIG.AVERAGE);
    config.data = { balance: this.currentUserBalance };
    let dialogRef = this.dialog.open(WithdrawalModalComponent, config);
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'withdrawal saved') {
        this.getCurrentUser();
        this.withdrawnAddedMsg = true;
        this.getAllWithdrawals();
        setTimeout(() => {
          this.withdrawnAddedMsg = false;
        }, 3000);
      }
    });
  }

  pageChanged(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.getAllWithdrawals();
  }
}
