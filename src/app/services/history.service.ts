import { Injectable } from '@angular/core';
import { AppConstants } from '../app.constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(private http: HttpClient) {}

  getAllUserHistory(pager) {
    return this.http.post(AppConstants.public_url + 'history', pager);
  }

  downloadStatement() {
    return this.http.get(
      AppConstants.public_url + 'history/downloadStatement',
      {
        responseType: 'blob',
        observe: 'response'
      }
    );
  }
}
