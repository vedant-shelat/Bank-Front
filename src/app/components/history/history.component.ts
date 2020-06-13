import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HistoryService } from 'src/app/services/history.service';
import { PageEvent, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  currentUserBalance;
  downloadedMsg;
  displayedColumns = ['date', 'operationType', 'amount'];
  totalHistories;
  histories = new MatTableDataSource([]);
  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 5,
    length: 0
  };
  loading;
  constructor(
    private userService: UserService,
    private historyService: HistoryService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.getAllUserHistory();
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe((res: any) => {
      this.currentUserBalance = res.balance;
    });
  }

  getAllUserHistory() {
    const pager = {
      page: this.pageEvent.pageIndex,
      size: this.pageEvent.pageSize
    };
    this.historyService.getAllUserHistory(pager).subscribe((res: any) => {
      console.log(res);
      this.totalHistories = res.length;
      this.histories = new MatTableDataSource(res.histories);
    });
  }

  downloadStatement() {
    this.loading = true;
    this.historyService.downloadStatement().subscribe(res => {
      this.buildBlobResponse(res);
    });
  }

  buildBlobResponse(response) {
    const linkElement = document.createElement('a');
    try {
      const contentType = response.body.type;
      const blob = new Blob([response.body], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      linkElement.setAttribute('href', url);
      linkElement.setAttribute('download', 'Account statement.csv');
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: false
      });
      linkElement.dispatchEvent(clickEvent);
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.log(e);
    }
  }

  pageChanged(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.getAllUserHistory();
  }
}
