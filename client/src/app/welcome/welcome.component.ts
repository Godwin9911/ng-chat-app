import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  errorMessage;

  constructor(private authservice: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  googleLogin() {
    // window.open('/api/auth/google', '_self');
    window.open('http://ngchatapp.herokuapp.com/api/auth/google', 'mywindow', 'location=1,status=1,scrollbars=1, width=800,height=800');
    window.addEventListener('message', (message) => {
      // console.log(message);
      this.authservice.SocialLogin(message.data.user)
      .subscribe({
        next: (data) => {
          if (this.authservice.isLoggedIn) {
            this.router.navigate(['/chat']);
          }
        },
        error: (err: Error)  =>  {
          this.errorMessage = `${err.message || ''}`;
        }
      });
    });
  }

}
