import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";

const token = localStorage.getItem('token')
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isExpired () {
    if (token) {
      const { exp } = jwt_decode(token);
      if (exp) {
        const now = new Date();
        const nowInSec = Math.floor(now.getTime() * 0.001); // Convert date to sec
        return nowInSec < exp;
      }
    }else {
      return false
    }
    
  }
}
