import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ILoginPayload } from '../../interfaces/login';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  submitted = false;
  loginForm = this.fb.group({
    email: new FormControl('',
      [
        Validators.email,
        Validators.required
      ]
    ),
    password: new FormControl('',
      [
        Validators.required
      ]
    ),
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private _router: Router) { }

  onSubmit() {
    this.submitted = true;
    const userData = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    } as ILoginPayload;
    this.loginService.loginUser(userData)
    .subscribe(res => {
      if (res) {
        this._router.navigate(['dashboard']);
      }
    },
    error => {
      // this.errors = error.error;
      //   Object.keys(error.error).forEach(key => {
      //     this.loginForm.get(key).setErrors({incorrect: true});
      //   });
    });
  }

}
