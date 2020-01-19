import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class LogoutService {

  logout(): void {
    localStorage.removeItem('ctrim-token');
    return;
  }
}
