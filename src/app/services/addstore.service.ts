import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAddStore, IStore } from '../../interfaces/store';
import { SettingsService } from './settings.service';



@Injectable({
  providedIn: 'root'
})
export class StoresService {
  storesUrl = this.settings.baseUrl + 'stores/';
  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }
  addStore(storeData: IAddStore): Observable<any> {
    return this.http.post<IStore[]>(
      this.storesUrl, storeData, this.settings.httpOptions
    ).pipe(
      map(data => {
        return data;
      })
    );
  }
}
