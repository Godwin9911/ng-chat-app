import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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
              private router: Router,
              private spinner: NgxSpinnerService) {}

  ngOnInit() {
    // this.spinner.show();
    localStorage.clear();
    this.authservice.checkAuthenticationStatus().subscribe({
      error: () => localStorage.clear(),
      complete: () => this.router.navigateByUrl('/chat')
    });

    /*setTimeout(() => {
      this.spinner.hide();
    }, 10000);
    */
  }

  logOut(): void {
    this.authservice.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
