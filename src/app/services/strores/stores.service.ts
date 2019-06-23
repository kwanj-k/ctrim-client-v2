import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from 'src/app/common/services/settings.service';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/common/interfaces/user';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  storesUrl = this.settings.baseUrl + 'stores/'
  token = this.tokenService.getToken()
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  };
  constructor(
    private http: HttpClient,
    private settings: SettingsService,
    private tokenService: TokenService
  ) { }
  getStores (): Observable<IStore[]> {
    return this.http.get<IStore[]>(this.storesUrl, this.httpOptions)
  }
}
