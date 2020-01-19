import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  get authUrl(): string {
    return this._authUrl;
  }
  set authUrl(value: string) {
    this._authUrl = value;
  }
  private _authUrl = environment.goauthUrl;
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
