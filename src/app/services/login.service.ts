import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoginPayload } from '../common/interfaces/user';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, timeout } from 'rxjs/operators';
import { SettingsService } from '../common/services/settings.service';
import { ToastrService } from 'ngx-toastr';

interface ILoginResponse {
  email: string;
  token: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = this.settings.baseUrl + 'login/'
  constructor(
    private http: HttpClient,
    private settings: SettingsService,
    private toastr: ToastrService
    ) {}
  loginUser (userData: ILoginPayload): Observable<{}> {
    return this.http.post<ILoginResponse>(this.loginUrl, userData, httpOptions).pipe(
      map(data => {
        localStorage.setItem('token', data.token);
        return data.token;
      }),
      catchError(this.handleError<{}>('login'))
    )
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (HttpErrorResponse: any): Observable<T> => {
      if (HttpErrorResponse.status === 400) {
        this.log(`${operation} failed: Wrong email or password`);
      } else{
        this.log(`${operation} failed: Something went wrong`);
      }
      return of(result as T);
    };
  }
  private log(message: string) {
    this.toastr.error(message, 'Authenitication failure', {
      timeOut: 7000
    });
  }
}
