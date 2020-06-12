import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  loginForm: FormGroup;
  hide = true;
  loading;
  badCredentialsMsg;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get getFormControls() {
    return this.loginForm.controls;
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (res: any) => {
        this.loading = false;
        this.userService.getCurrentUser().subscribe(
          response => {
            this.userService.setCurrentUserInfo(response);
          },
          err => {
            console.log(err);
          }
        );
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.loading = false;
        if (err.error.message === 'BAD_CREDENTIALS') {
          this.badCredentialsMsg = true;
        }
        setTimeout(() => {
          this.badCredentialsMsg = false;
        }, 3000);
      }
    );
  }
}
