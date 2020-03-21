import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-chat',
  template: `
      <div class="container mt-2">
        <div class="mr-auto">
          <img class="image-fluid" src="https://randomuser.me/api/portraits/men/20.jpg" />
          <span>{{ AuthUser.firstname }} {{ AuthUser.lastname }}</span>
        </div>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link"
            [routerLink]="['current-chats']"
            routerLinkActive='active'>Chats</a>
          </li>
          <li class="nav-item">
            <a class="nav-link"
            [routerLink]="['contacts']"
            routerLinkActive='active'>Contacts</a>
          </li>
          <li class="nav-item">
            <a class="nav-link"
            [routerLink]="['settings']"
            routerLinkActive='active'>Settings</a>
          </li>
        </ul>

        <div class="mt-2">
          <div>
            <router-outlet></router-outlet>
          </div>
        </div>
    </div>
  `,
  styles: []
})
export class ChatComponent implements OnInit {

  get AuthUser() {
    return this.authservice.currentUser;
  }

  constructor(private authservice: AuthService) {}

  ngOnInit(): void {
  }

}
