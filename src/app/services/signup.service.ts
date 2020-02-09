import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ISignupPayload, ISignupResponse } from '../interfaces/signup';
import { SettingsService } from './settings.service';


@Injectable({
  providedIn: 'root'
})
export class SignupService {
  signupUrl = this.settings.authUrl + 'register/';

  constructor(
    private settings: SettingsService,
    private http: HttpClient,
  ) { }

  signupUser(userData: ISignupPayload): Observable<{}> {
    return this.http.post<ISignupResponse>(
      this.signupUrl, userData, this.settings.authHttpOptions
    ).pipe(
      map(data => {
        localStorage.setItem('ctrim-token', data.token);
        return data;
      })
    );
  }
}
