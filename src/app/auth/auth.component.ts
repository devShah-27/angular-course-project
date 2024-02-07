import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  constructor(private authService: AuthService, private router: Router) { };

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>

    this.isLoading = true;

    if (this.isLoginMode) {
      authObservable = this.authService.logIn(email, password)
    } else {
      authObservable = this.authService.signUp(email, password)
    }

    authObservable.subscribe(resData => {
      // console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },
      errorMessage => {
        // console.log(errorMessage);
        this.error = errorMessage;

        this.isLoading = false;

        setTimeout(() => {
          this.error = null
        }, 5000);
      });


    form.reset();
  }
}
