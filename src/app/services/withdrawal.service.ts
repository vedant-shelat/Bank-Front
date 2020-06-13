import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {
  constructor(private http: HttpClient) {}

  saveWithdrawal(withdrawal) {
    return this.http.post(
      AppConstants.public_url + 'withdrawal/withdrawMoney',
      withdrawal
    );
  }

  getAllWithdrawals(pager) {
    return this.http.post(AppConstants.public_url + 'withdrawal', pager);
  }
}
