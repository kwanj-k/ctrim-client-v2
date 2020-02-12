import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  get baseUrl(): string {
    return this._authUrl;
  }
  set baseUrl(value: string) {
    this._authUrl = value;
  }
  get authUrl(): string {
    return this._authUrl;
  }
  set authUrl(value: string) {
    this._authUrl = value;
  }
  get token(): string {
    return this._token;
  }
  set token(value: string) {
    this._token = value;
  }
  private _token: string = localStorage.getItem('ctrim-token');
  private _authUrl = environment.goauthUrl;
  public authHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token
    })
  };
}
