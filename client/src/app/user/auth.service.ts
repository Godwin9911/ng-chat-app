import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user';
import { Error } from '../core/error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private currentUserSubject: BehaviorSubject<User>;
public currentUser: Observable<User>;
  redirectUrl: string;

get isLoggedIn(): boolean {
  if (this.currentUserSubject.value) { return true; }
  return false;
}

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get CurrentUserValue(): User {
    return this.currentUserSubject.value;
  }

  private userUrl = 'api/user';

  register(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(`${this.userUrl}/register`, user, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  login(email: string, password: string): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(`${this.userUrl}/login`, {email, password}, { headers })
      .pipe(
        tap(data => {
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
        }),
        catchError(this.handleError)
      );
  }

  checkAuthenticationStatus(): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/checkidentity`)
      .pipe(
        tap( data => {
          if ( data instanceof Object) {
            localStorage.setItem('currentUser', JSON.stringify(data));
            this.currentUserSubject.next(data);
          }
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    this.currentUser = null;
    localStorage.clear();
    return this.http.get<User>(`${this.userUrl}/logout`);
  }

  private handleError(err: HttpErrorResponse ) {
    const dataErr = new Error();
    dataErr.statusText = err.statusText;
    dataErr.message = err.error.message;
    return throwError(dataErr);
  }
}
