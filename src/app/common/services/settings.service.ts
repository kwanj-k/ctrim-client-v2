import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  get baseUrl(): string {
    return this._baseUrl
  }
  set baseUrl(value: string) {
    this._baseUrl = value
  }
  private _baseUrl = environment.apiUrl
}
