import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/shared/services/token.service';
import { IProduct } from 'src/app/products/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsUrl = this.settings.baseUrl + 'products/';
  token = this.tokenService.getToken();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token
    })
  };
  constructor(
    private http: HttpClient,
    private settings: SettingsService,
    private tokenService: TokenService
  ) { }
  getProducts(storeName: string): Observable<{}> {
    return this.http.get<IProduct>(
      this.productsUrl + storeName,
      this.httpOptions
    );
  }
}
