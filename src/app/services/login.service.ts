import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SettingsService } from './settings.service';
import { ILoginPayload, ILoginResponse } from '../interfaces/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = this.settings.authUrl + 'login/';
  constructor(
    private http: HttpClient,
    private settings: SettingsService,
    ) {}

  loginUser(userData: ILoginPayload): Observable<{}> {
    return this.http.post<ILoginResponse>(
        this.loginUrl, userData, this.settings.authHttpOptions).pipe(
            map(data => {
                localStorage.setItem('ctrim-token', data.token);
                return data;
        }),
    );
  }
}
