import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginPayload, ILoginResponse } from '../interfaces/login';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from './settings.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = this.settings.authUrl + 'login/';
  constructor(
    private http: HttpClient,
    private settings: SettingsService,
    private toastr: ToastrService
    ) {}

  loginUser(userData: ILoginPayload): Observable<{}> {
    return this.http.post<ILoginResponse>(
        this.loginUrl, userData, this.settings.httpOptions).pipe(
            map(data => {
                localStorage.setItem('ctrim-token', data.token);
                return data;
        }),
    );
  }
}
