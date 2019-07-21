import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './services/product.service';
import { IProduct } from './interfaces';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[];
  nextPage = false;
  prevPage = false;
  productExist = false;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts()
    }

  getProducts(): void {
    const storeName = this.route.snapshot.paramMap.get('storename');
    this.productsService.getProducts(storeName).subscribe(
      products => {
        if (products['next'] != null){
          this.nextPage = true
        }
        if (products['previous'] != null){
          this.prevPage = true
        }
        if (products['results'].length > 1) {
          this.productExist = true;
        }
        this.products = products['results'];
      }
    )
  }

}
