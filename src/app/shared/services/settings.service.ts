import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  get baseUrl(): string {
    return this._baseUrl;
  }
  set baseUrl(value: string) {
    this._baseUrl = value;
  }
  private _baseUrl = environment.apiUrl;
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
