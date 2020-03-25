import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { User } from '../user';
import { Error } from '../../core/error';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

function passwordMatcher( c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmControl = c.get('confirmPassword');

  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value ) {
    return null;
  }
  // tslint:disable-next-line: object-literal-key-quotes
  return { 'match': true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;
  user = new User();

  constructor(private fb: FormBuilder,
              private authservice: AuthService,
              private router: Router,
              private spinner: NgxSpinnerService ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      }, { validator: passwordMatcher})
    });
  }

  save() {
    this.spinner.show();
    const { firstname, lastname, email, passwordGroup: { password } } = this.registerForm.value;
    this.authservice.register({ firstname, lastname, email, password })
      .subscribe({
        next: (data: User) => {
          if (data) {
            this.spinner.hide();
            this.router.navigate(['/login']);
          }
        },
        error: (err: Error)  => {
          this.spinner.hide();
          this.errorMessage = `${err.message}`;
        }
      });
  }

}
