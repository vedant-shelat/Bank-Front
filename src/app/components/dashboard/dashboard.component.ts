import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'lodash';
import { AppConstants } from 'src/app/app.constant';
import { MatDialog } from '@angular/material';
import { GeneralModalComponent } from 'src/app/modal/general-modal/general-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser;
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.currentUserInfo.subscribe(res => {
      this.currentUser = res;
    });
  }

  logout() {
    let config = _.cloneDeep(AppConstants.DIALOG_CONFIG.SMALL);
    config.data = {
      title: 'Logout ?',
      text: 'Are you sure, you want to logout ?'
    };
    let dialogRef = this.dialog.open(GeneralModalComponent, config);
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'yes') {
        this.userService.logout().subscribe(response => {
          this.router.navigate(['/']);
          localStorage.removeItem('token');
        });
      }
    });
  }
}
