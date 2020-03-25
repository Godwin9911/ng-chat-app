import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
// import { ContactService } from './chat/contact-list/contact.service';
import { AuthService } from './user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // private url = 'http://localhost:5000';
  // private socket;

  get AuthUserId() {
    return this.authService.currentUser?._id;
  }

  constructor(private authService: AuthService) {
    // this.socket = io(this.url);
  }

  public sendMessage(message, reciepientId) {
    const socket = io('http://localhost:5000');
    socket.emit( `message${reciepientId}`, message);
  }

  public getMessages = () => {
    const socket = io('http://localhost:5000');
    return Observable.create((observer) => {
      console.log(this.AuthUserId);
      socket.on(`message${this.AuthUserId}`, (message) => {
            console.log(message);
            observer.next(message);
        });
      return () => {
          socket.disconnect();
        };
    });
}
}
