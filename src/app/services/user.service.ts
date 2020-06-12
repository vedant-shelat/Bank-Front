import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app.constant';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserInfo: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient) {}

  register(user) {
    return this.http.post(AppConstants.public_url + 'register', user, {
      responseType: 'text'
    });
  }

  login(user) {
    return this.http.post(AppConstants.public_url + 'authenticate', user);
  }

  getCurrentUser() {
    return this.http.get(AppConstants.public_url + 'user/currentUser');
  }

  setCurrentUserInfo(user) {
    this.currentUserInfo.next(user);
  }

  logout() {
    return this.http.post(AppConstants.public_url + 'user/disconnect', null);
  }

  forgotpassword(email) {
    return this.http.post(
      AppConstants.public_url + 'user/forgotPassword',
      email,
      { responseType: 'text' }
    );
  }
}
