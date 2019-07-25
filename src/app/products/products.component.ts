import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './services/product.service';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { IProduct } from './interfaces';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
  proFormSubmitted = false;
  addProductForm = this.fb.group({
    productName: new FormControl('',
      [
        Validators.required
      ]
    ),
    packagingName: new FormControl('',
      [
        Validators.required
      ]
    ),
    availablePackages: new FormControl(0,
      [
        Validators.required
      ]
    ),
    packagePrice: new FormControl(0,
      [
        Validators.required
      ]
    ),
    numberOfPieces: new FormControl(0,
      [
        Validators.required
      ]
    ),
    piecePrice: new FormControl(0,
      [
        Validators.required
      ]
    ),
    piecesInPackage: new FormControl(0,
      [
        Validators.required
      ]
    ),
  });
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductService,
    private settings: SettingsService,
    private fb: FormBuilder,
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

  addProduct(): void {
    this.proFormSubmitted = true;
    const productData = {
        name: this.addProductForm.get('productName').value,
        packaging: this.addProductForm.get('packagingName').value,
        package_pices: this.addProductForm.get('piecesInPackage').value,
        number_of_packages: this.addProductForm.get('availablePackages').value,
        package_price: this.addProductForm.get('packagePrice').value,
        piece_price: this.addProductForm.get('piecePrice').value,
        number_of_pieces: this.addProductForm.get('numberOfPieces').value,
    }
    console.log(productData)
  }
} 
