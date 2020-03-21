import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NG-CHAT-APP';

  get AuthUser() {
    return this.authservice.currentUser;
  }

  constructor(private authservice: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.authservice.checkAuthenticationStatus().subscribe({
      complete: () => this.router.navigateByUrl('/chat')
    });
  }

  logOut(): void {
    this.authservice.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
