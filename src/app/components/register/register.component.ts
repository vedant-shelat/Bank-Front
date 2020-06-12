import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupSuccessMsg;
  emailExistsMsg;
  usernameExistsMsg;
  registerForm: FormGroup;
  user: any = {};
  loading;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  get getFormControls() {
    return this.registerForm.controls;
  }

  register() {
    this.loading = true;
    this.userService.register(this.registerForm.value).subscribe(
      res => {
        this.loading = false;
        this.signupSuccessMsg = true;
        this.registerForm.reset();
      },
      err => {
        this.loading = false;
        if (err.error === 'Email exists') {
          this.emailExistsMsg = true;
        }
        if (err.error === 'Username exists') {
          this.usernameExistsMsg = true;
        }
      }
    );
    setTimeout(() => {
      this.emailExistsMsg = false;
      this.usernameExistsMsg = false;
      this.signupSuccessMsg = false;
    }, 5000);
  }
}
