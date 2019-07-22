import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './services/product.service';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  storeName = this.route.snapshot.paramMap.get('storename');
  productsUrl = this.settings.baseUrl + 'products/' + this.storeName;
  products: any[];
  nextPage = false;
  prevPage = false;
  productExist = false;
  nextUrl: string;
  prevUrl: string;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductService,
    private settings: SettingsService,
  ) { }

  ngOnInit() {
    this.getProducts(this.productsUrl);
    }

  onNext(): void{
    this.getProducts(this.nextUrl);
  }

  onPrev(): void{
    this.getProducts(this.prevUrl);
  }

  getProducts(url: string): void {
    this.productsService.getProducts(url).subscribe(
      products => {
        if (products['next'] != null) {
          this.nextPage = true;
          this.nextUrl = products['next'];
        }
        if (products['previous'] != null) {
          this.prevPage = true;
          this.prevUrl = products['previous'];
        }
        if (products['results'].length > 1) {
          this.productExist = true;
        }
        this.products = products['results'];
      }
    );
  }

}
