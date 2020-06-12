import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  NgForm
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileupdateSuccessMsg;
  currentUser: any = {};
  userForm: FormGroup;
  @ViewChild('userFormDirective') private userFormDirective: NgForm;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.userForm = this.formBuilder.group({
      username: new FormControl('', []),
      email: new FormControl('', []),
      password: new FormControl('', [Validators.required])
    });
  }

  get getFormControls() {
    return this.userForm.controls;
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
    });
  }

  updateUserInfo() {
    this.userService.updateUserInfo(this.currentUser).subscribe((res: any) => {
      this.profileupdateSuccessMsg = true;
      this.userForm.reset();
      this.userFormDirective.resetForm();
      this.getCurrentUser();
    });
    setTimeout(() => {
      this.profileupdateSuccessMsg = false;
    }, 4000);
  }
}
