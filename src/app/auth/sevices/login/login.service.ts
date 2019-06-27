import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginPayload } from 'src/app/auth/interfaces';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { SettingsService } from 'src/app/shared/services/settings.service';

interface ILoginResponse {
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = this.settings.baseUrl + 'login/';
  constructor(
    private http: HttpClient,
    private settings: SettingsService,
    private toastr: ToastrService,
    private authService: AuthService
    ) {}

  loginUser(userData: ILoginPayload): Observable<{}> {
    return this.http.post<ILoginResponse>(this.loginUrl, userData, this.settings.httpOptions).pipe(
      map(data => {
        localStorage.setItem('token', data.token);
        this.authService.isLoggedIn = true;
        return data.token;
      }),
      catchError(this.handleError())
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure

      // TODO: better job of transforming error for user consumption
      this.log(`${error.error.non_field_errors[0]}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.toastr.error(message, 'Login failure', {
      timeOut: 7000
    });
  }
}
