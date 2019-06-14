import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginPayload } from '../common/interfaces/user';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SettingsService } from '../common/services/settings.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth/auth.service';

interface ILoginResponse {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = this.settings.baseUrl + 'login/'
  constructor(
    private http: HttpClient,
    private settings: SettingsService,
    private toastr: ToastrService,
    private authService: AuthService
    ) {}

  loginUser (userData: ILoginPayload): Observable<{}> {
    return this.http.post<ILoginResponse>(this.loginUrl, userData, this.settings.httpOptions).pipe(
      map(data => {
        localStorage.setItem('token', data.token);
        this.authService.isLoggedIn = true
        return data.token;
      }),
      catchError(this.handleError<{}>('login'))
    )
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
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
