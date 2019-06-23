import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ISignupPayload } from '../../interfaces';
import { SignupService } from 'src/app/auth/sevices/signup/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm = this.fb.group({
    email: new FormControl('',
      [
        Validators.email,
        Validators.required
      ]
    ),
    username: new FormControl('',
      [
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
    private signupService: SignupService,
    private _router: Router
  ) { }

  onSubmit() {
    const userData = <ISignupPayload> {
      email: this.signupForm.get('email').value,
      username: this.signupForm.get('username').value,
      password: this.signupForm.get('password').value
    }
    this.signupService.signupUser(userData)
      .subscribe(res => {
        if (res) {
          this._router.navigate(['stores'])
        }
      })
  }

}
