import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ILoginPayload } from '../../interfaces';
import { Router } from '@angular/router';
import { LoginService } from '../../sevices/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
  })

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private _router: Router) { }

  onSubmit() {
    const userData = <ILoginPayload> {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.loginService.loginUser(userData)
    .subscribe(res => {
      if (res) {
        this._router.navigate(['stores']);
      }
    });
    }

}
