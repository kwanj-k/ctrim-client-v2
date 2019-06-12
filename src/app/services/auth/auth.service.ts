import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  constructor (private tokenService: TokenService) {}

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  checkToken(): Observable<boolean> {
    const check = this.tokenService.isExpired()
    if (!!check) {
      return of(true).pipe(
        tap(val => this.isLoggedIn = true)
      )
    }
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
