import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subscription } from 'rxjs';
// import { ContactService } from './chat/contact-list/contact.service';
import { AuthService } from './user/auth.service';
import { User } from './user/user';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // private url = 'http://localhost:5000';
  private socket;

  theUser = JSON.parse(localStorage.getItem('currentUser'));
  currentUser: User;
  currentSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.currentSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  public setupSocketConnection() {
    this.socket = io();
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public sendMessage(message, reciepientId) {
    // socket = io('http://localhost:5000');
    this.socket.emit( `message${reciepientId}`, message);
  }

  public getMessages = () => {
    // const socket = io('http://localhost:5000');
    return Observable.create((observer) => {
      if (this.theUser._id) {
          this.socket.on(`message${this.theUser._id}`, (message) => {
            observer.next(message);
        });
          return () => {
            this.socket.disconnect();
          };
      }
    });
}
}
