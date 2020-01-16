import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ISignupPayload } from '../../interfaces/signup';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  submitted = false;
  errors: {
    username: [],
    email: [],
    password: [],
    confirmPassword: [],
  };
  signupForm = this.fb.group({
    username: new FormControl('',
      [
        Validators.required
      ]
    ),
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
    confirmPassword: new FormControl('',
      [
        Validators.required
      ]
    ),
  });

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private _router: Router
  ) { }

  onSubmit() {
    this.submitted = true;
    const userData = {
      email: this.signupForm.get('email').value,
      username: this.signupForm.get('username').value,
      password: this.signupForm.get('password').value     
    } as ISignupPayload;
    this.signupService.signupUser(userData)
      .subscribe(res => {
        if (res) {
          this._router.navigate(['dashboard']);
        }
      },
        error => {
          this.errors = error.error;
          Object.keys(error.error).forEach(key => {
            this.signupForm.get(key).setErrors({ incorrect: true });
          });
        });
  }

}
