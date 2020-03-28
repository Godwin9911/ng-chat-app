import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { Error } from '../../core/error';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  coversations;
  contacts;
  selectedUser;

  set selUser(user) {
    this.selectedUser = user;
  }

  constructor(private http: HttpClient,
              private spinner: NgxSpinnerService) { }

  private messageUrl = 'api/message';

  getConversations(): Observable<any> {
    this.spinner.show();
    return this.http.get(`${this.messageUrl}/conversations`)
      .pipe(
        finalize(() => this.spinner.hide()),
        tap( data =>  {
           this.coversations = data;
           // console.log(this.coversations);
        }),
        catchError(this.handleError)
      );
  }

  getContacts(): Observable<any> {
    this.spinner.show();
    return this.http.get(`${this.messageUrl}/users`)
      .pipe(
        finalize(() => this.spinner.hide()),
        tap( data =>  {
           this.contacts = data;
           // console.log(this.contacts);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse ) {
    const dataErr = new Error();
    dataErr.statusText = err.statusText;
    dataErr.message = err.error.message;
    return throwError(dataErr);
  }
}
