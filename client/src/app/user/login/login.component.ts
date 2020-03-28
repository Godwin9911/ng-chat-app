import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Error } from '../../core/error';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: string;

  constructor(private authservice: AuthService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (form.valid) {
      this.spinner.show();
      const { email, password } = form.value;
      // console.log(form.value);
      this.authservice.login(email, password)
        .subscribe({
          next: (data: User) => {
            if (this.authservice.isLoggedIn) {
              this.spinner.hide();
              this.router.navigate(['/chat']);
            }
          },
          error: (err: Error)  =>  {
            this.spinner.hide();
            this.errorMessage = `${err.statusText}, ${err.message || ''}`;
          }
        });
    }
  }

  log() {
    // window.open('/api/auth/google', '_self');
    window.open('http://ngchatapp.herokuapp.com/api/auth/google', 'mywindow', 'location=1,status=1,scrollbars=1,width=800,height=800');
    window.addEventListener('message', (message) => {
      console.log(message);
      this.authservice.SocialLogin(message.data.user)
      .subscribe({
        next: (data) => {
          if (this.authservice.isLoggedIn) {
            this.router.navigate(['/chat']);
            // this.router.navigateByUrl('/chat');
          }
        },
        error: (err: Error)  =>  {
          this.errorMessage = `${err.message || ''}`;
        }
      });
    });
  }

}
