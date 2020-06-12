import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  NgForm
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
  pwdForgotForm: FormGroup;
  hide = true;
  loading;
  badCredentialsMsg;
  pwdForgotLoading;
  showForgetPwdText;
  forgotPwdEmail;
  emailSentMsg;
  emailDidntExistsMsg;
  @ViewChild('pwdFormDirective') private pwdFormDirective: NgForm;
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
    this.pwdForgotForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ])
    });
  }

  get getFormControls() {
    return this.loginForm.controls;
  }

  get getPwdFormControls() {
    return this.pwdForgotForm.controls;
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (res: any) => {
        this.loading = false;
        localStorage.setItem('token', res.token);
        this.userService.getCurrentUser().subscribe(response => {
          this.userService.setCurrentUserInfo(response);
          this.router.navigate(['/dashboard']);
        });
      },
      err => {
        this.loading = false;
        this.badCredentialsMsg = true;
        setTimeout(() => {
          this.badCredentialsMsg = false;
        }, 3000);
      }
    );
  }

  passwordForgot() {
    this.pwdForgotLoading = true;
    this.userService.forgotpassword(this.pwdForgotForm.value).subscribe(
      res => {
        this.pwdForgotLoading = false;
        this.emailSentMsg = true;
        this.pwdForgotForm.reset();
        this.pwdFormDirective.resetForm();
      },
      err => {
        console.log(err);
        this.pwdForgotLoading = false;
        if (err.error === "Email doesn't exists") {
          this.emailDidntExistsMsg = true;
        }
      }
    );
    setTimeout(() => {
      this.emailDidntExistsMsg = false;
      this.emailSentMsg = false;
    }, 5000);
  }
}
