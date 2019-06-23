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
      catchError(this.handleError<{}>(''))
    )
  }
  /** 
  Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
   private handleError<T> (operation = 'operation', result?: T) {
     return (HttpErrorResponse: any): Observable<T> => {
       if (HttpErrorResponse.status === 400) {
        const errors = HttpErrorResponse.error
        for(const key in errors) {
          this.log(`${operation} ${errors[key][0]}`);
        }
       } else{
         this.log(`${operation} Something went wrong`);
       }
       return of(result as T);
     };
   }
   private log(message: string) {
     this.toastr.error(message, 'Registration failure', {
       timeOut: 1700000
     });
   }

}
