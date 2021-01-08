import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAddStock } from '../interfaces/store';
import { SettingsService } from './settings.service';



@Injectable({
  providedIn: 'root'
})
export class StockService {
  storesUrl = this.settings.baseUrl + 'stocks/';
  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }
  addStock(stockData: IAddStock, storeID: number): Observable<any> {
    return this.http.post<{}>(
      this.storesUrl + `${storeID}`, stockData, this.settings.httpOptions
    ).pipe(
      map(data => {
        return data;
      })
    );
  }
}
