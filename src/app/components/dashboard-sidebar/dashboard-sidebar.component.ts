import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent implements OnInit {
  currentUser;
  fullname;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((res: any) => {
      this.currentUser = res;
      this.fullname = res.firstname + ' ' + res.lastname;
    });
  }
}
