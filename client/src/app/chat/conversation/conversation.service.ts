import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Error } from '../../core/error';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  messages;

  set clearMessages(msg) {
    this.messages = msg;
  }

  constructor(private http: HttpClient) { }

  private messageUrl = 'api/message';

  getMessages(id): Observable<any> {
    return this.http.get(`${this.messageUrl}/conversations/${id}`)
      .pipe(
        tap( data => this.messages  = data),
          // data => console.log(data)),
        catchError(this.handleError)
      );
  }

  sendMessage(composedMessage, reciepientId): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post<any>(`${this.messageUrl}/send/${reciepientId}`, {composedMessage}, { headers })
      .pipe(
        /*tap( data => {
          this.updateMessages();
        }),*/
          //console.log(data)),
        catchError(this.handleError)
      );
  }

  checkConversation(userId): Observable<any> {
    return this.http.get(`${this.messageUrl}/check-conversation/${userId}`)
      .pipe(
        /*tap( data => {
          this.messages  = data;
          console.log(this.messages);
        }),
        */
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse ) {
    const dataErr = new Error();
    dataErr.status = err.status;
    dataErr.statusText = err.statusText;
    dataErr.message = err.error.message;
    return throwError(dataErr);
  }
}
