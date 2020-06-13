import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  constructor(private http: HttpClient) {}

  getAllDeposits(pager) {
    return this.http.post(AppConstants.public_url + 'deposit', pager);
  }

  saveDeposit(deposit) {
    return this.http.post(
      AppConstants.public_url + 'deposit/addDeposit',
      deposit
    );
  }
}
