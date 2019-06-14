import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = this.checkToken()

  constructor (private tokenService: TokenService) {}

  checkToken(): boolean {
    const check = this.tokenService.isExpired()
    return check
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
