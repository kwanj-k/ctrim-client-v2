import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoginPayload } from '../common/interfaces/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SettingsService } from '../common/services/settings.service';

interface ILoginResponse {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  loginUrl = this.settings.baseUrl + 'login/'
  constructor(
    private http: HttpClient,
    private settings: SettingsService
    ) {}
  
  loginUser (userData: ILoginPayload): Observable<{}> {
    return this.http.post<ILoginResponse>(this.loginUrl, userData).pipe(
      map(data => {
        localStorage.setItem('token', data.token);
        return data.token;

      })
    )
  }
}
