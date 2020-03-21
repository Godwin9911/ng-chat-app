import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-chat',
  template: `
      <div>
        <div class="bg-dark">
          <div class="text-right bg-dark text-light fixed-top">
            <div class="p-3">
              <span><b>{{ AuthUser.firstname }} {{ AuthUser.lastname }}</b></span>
              <img class="image-fluid my-img ml-2" src="https://randomuser.me/api/portraits/men/20.jpg" />
            </div>
            <div class="container">
              <ul class="nav nav-tabs w-100">
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
          </div>
          </div>
        </div>

        <div class="tab-margin mb-5 container outlet">
          <div style="margin-top: 5rem; margin-bottom: 5rem;">
            <router-outlet></router-outlet>
          </div>
        </div>

        <div class="fixed-bottom">
          <div class="bg-light">
            <div class="container bottom-nav">
            <ul class="nav nav-tabs nav-justified tab-margin">
            <li class="nav-item">
                <a class="nav-link"
                [routerLink]="['welcome']"
                routerLinkActive='active'><i class="fa fa-home fa-2x"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link"
                [routerLink]="['current-chats']"
                routerLinkActive='active'><i class="fa fa-envelope fa-2x"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link"
                [routerLink]="['contacts']"
                routerLinkActive='active'><i class="fa fa-users fa-2x"></i></a>
              </li>
              <li class="nav-item">
                <a class="nav-link"
                [routerLink]="['settings']"
                routerLinkActive='active'><i class="fa fa-cog fa-2x"></i></a>
              </li>
            </ul>
            </div>
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
