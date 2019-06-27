import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = this.checkToken();

  constructor(private tokenService: TokenService) {}

  checkToken(): boolean {
    const check = this.tokenService.isExpired();
    return check;
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    return;
  }
}
