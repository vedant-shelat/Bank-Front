import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AppConstants } from 'src/app/app.constant';
import { GeneralModalComponent } from 'src/app/modal/general-modal/general-modal.component';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser;
  loggedIn = false;
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.currentUserInfo.subscribe(res => {
      if (res === null) {
        this.loggedIn = false;
      } else {
        this.getCurrentUser();
      }
    });
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      res => {
        this.loggedIn = true;
        this.currentUser = res;
      },
      err => {
        this.loggedIn = false;
      }
    );
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
          this.loggedIn = false;
          this.router.navigate(['/']);
          localStorage.removeItem('token');
        });
      }
    });
  }
}
