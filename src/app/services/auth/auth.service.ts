import { Injectable } from '@angular/core';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = this.checkToken()

  constructor (private tokenService: TokenService) {}

  checkToken(): boolean {
    const check = this.tokenService.isExpired()
    console.log(check)
    return check
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
