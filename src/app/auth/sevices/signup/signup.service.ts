import { Injectable } from '@angular/core';
import { SettingsService } from '../../../shared/services/settings.service';
import { HttpClient } from '@angular/common/http';
import { ISignupPayload, ISignupResponse } from '../../interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';



@Injectable({
  providedIn: 'root'
})
export class SignupService {
  signupUrl = this.settings.baseUrl + 'register/';

  constructor(
    private settings: SettingsService,
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  signupUser(userData: ISignupPayload): Observable<{}> {
    return this.http.post<ISignupResponse>(
      this.signupUrl, userData, this.settings.httpOptions
    ).pipe(
      map(data => {
        localStorage.setItem('token', data.token);
        this.authService.isLoggedIn = true;
        return data;
      })
    );
  }
}
