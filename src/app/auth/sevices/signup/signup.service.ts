import { Injectable } from '@angular/core';
import { SettingsService } from '../../../shared/services/settings.service';
import { HttpClient } from '@angular/common/http';
import { ISignupPayload, ISignupResponse } from '../../interfaces';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';



@Injectable({
  providedIn: 'root'
})
export class SignupService {
  signupUrl = this.settings.baseUrl + 'register/'

  constructor(
    private settings: SettingsService,
    private http: HttpClient,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  signupUser (userData: ISignupPayload): Observable<{}> {
    return this.http.post<ISignupResponse>(
      this.signupUrl, userData, this.settings.httpOptions
    ).pipe(
      map(data => {
        localStorage.setItem('token', data.token);
        this.authService.isLoggedIn = true
        return data.token;
      }),
      catchError(this.handleError())
    )
  }
  private handleError() {
    return (error: any)  => {

      // TODO: send the error to the redux store so to log in the form
      Object.keys(error.error).forEach(key => {
        this.log(`${key}: ${error.error[key]}`);
      })
      return error
    };
  }
   private log(message: string) {
     this.toastr.error(message, 'Signup failure', {
       timeOut: 5000
     });
   }

}
