import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './services/product.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { IProduct } from './interfaces';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  storeName = this.route.snapshot.paramMap.get('storename');
  productsUrl = this.settings.baseUrl + 'products/' + this.storeName;
  products: IProduct[];
  nextPage = false;
  prevPage = false;
  productExist = false;
  isLoading = true;
  nextUrl: string;
  prevUrl: string;
  productsExist = true;
  showAddProdModal = false;
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
        } else {
          this.nextPage = false;
        }
        if (products['previous'] != null) {
          this.prevPage = true;
          this.prevUrl = products['previous'];
        } else {
          this.prevPage = false;
        }
        if (products['results'].length > 1) {
          this.productsExist = false;
        }
        this.products = products['results'];
        this.isLoading = false;
      }
    );
  }

  deleteProduct(product: IProduct): void{
    this.products = this.products.filter(p => p !== product);
    const url =this.productsUrl + '/' + product.name
    this.productsService.delete(url).subscribe();
  }

  addProdModal(): void {
    this.showAddProdModal = !this.showAddProdModal;
  }
}
