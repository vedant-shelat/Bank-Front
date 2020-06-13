import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { GeneralModalComponent } from '../modal/general-modal/general-modal.component';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headerConfig = {};

    const token = localStorage.getItem('token');
    if (token) {
      headerConfig['Authorization'] = `Bearer ${token}`;
    }
    const _req = req.clone({ setHeaders: headerConfig });
    return next.handle(_req).pipe(
      catchError(err => {
        if (err.error != null) {
          if (err.error.status === 417) {
            this.userService.setCurrentUserInfo(null);
            const title = 'Your Session has expired';
            const text = 'Please log in again !';
            const btn = 'Ok';
            if (this.dialog.openDialogs.length) {
              return;
            }
            const dialogRef = this.dialog.open(GeneralModalComponent, {
              data: { title: title, text: text, btn: btn }
            });
            dialogRef.afterClosed().subscribe(res => {
              localStorage.removeItem('token');
              this.router.navigate(['/']);
            });
          }
        }
        return throwError(err);
      })
    );
  }
}
