import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, PageEvent, MatDialog } from '@angular/material';
import { DepositService } from 'src/app/services/deposit.service';
import * as _ from 'lodash';
import { AppConstants } from 'src/app/app.constant';
import { DepositModalComponent } from './deposit-modal/deposit-modal.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  depositAddedMsg;
  deposits = new MatTableDataSource([]);
  totalDeposits;
  currentUserBalance;
  displayedColumns = ['date', 'amount'];
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0
  };
  constructor(
    private toastr: ToastrService,
    private dialog: MatDialog,
    private depositService: DepositService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAllDeposits();
    this.getCurrentUser();
  }

  getAllDeposits() {
    const pager = {
      page: this.pageEvent.pageIndex,
      size: this.pageEvent.pageSize
    };
    this.depositService.getAllDeposits(pager).subscribe((res: any) => {
      this.totalDeposits = res.length;
      this.deposits = new MatTableDataSource(res.deposits);
    });
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe((res: any) => {
      this.currentUserBalance = res.balance;
    });
  }

  makeDeposit() {
    const config = _.cloneDeep(AppConstants.DIALOG_CONFIG.AVERAGE);
    config.data = {};
    let dialogRef = this.dialog.open(DepositModalComponent, config);
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'deposit saved') {
        this.getCurrentUser();
        this.depositAddedMsg = true;
        this.getAllDeposits();
        setTimeout(() => {
          this.depositAddedMsg = false;
        }, 3000);
      }
    });
  }

  pageChanged(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.getAllDeposits();
  }
}
