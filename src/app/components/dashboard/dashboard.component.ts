import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
      this.userService.setCurrentUserInfo(res);
    });
  }
}
