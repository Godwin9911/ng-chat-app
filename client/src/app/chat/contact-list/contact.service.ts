import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Error } from '../../core/error';

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

  constructor(private http: HttpClient) { }

  private messageUrl = 'api/message';

  getConversations(): Observable<any> {
    return this.http.get(`${this.messageUrl}/conversations`)
      .pipe(
        tap( data =>  {
           this.coversations = data;
           // console.log(this.coversations);
        }),
        catchError(this.handleError)
      );
  }

  getContacts(): Observable<any> {
    return this.http.get(`${this.messageUrl}/users`)
      .pipe(
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
