import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedIn {
    private token: string = localStorage.getItem('ctrim-token');
    isExpired(): boolean {
        console.log(this.token)
        if (this.token){
            const { exp } = jwt_decode(this.token);
            const now = new Date();
            const nowInSec = Math.floor(now.getTime() * 0.001); // Convert date to sec
            return nowInSec < exp;
        } else {
            return false;
        }
    }
}