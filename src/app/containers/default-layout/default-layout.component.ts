import {Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, Validators } from '@angular/forms'

import { navItems } from '../../_nav';
import { LogoutService } from '../../services/logout.service';
import { StockService } from '../../services/addStock.service'
import { IAddStock } from '../../interfaces/store';



@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'

})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public current_year = new Date().getFullYear();

  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  submitted = false;
  error: string;
  addStockForm = this.fb.group({
    name: new FormControl('',
      [
        Validators.required
      ]
    ),
    description: new FormControl('',
      [
        Validators.required
      ]
    ),
  });

  constructor(
    private logoutService: LogoutService,
    private router: Router,
    private fb: FormBuilder,
    private StockService: StockService,
    ) { }
  
    logOut() {
      this.logoutService.logout();
      this.router.navigate(['login']);
      return;
    }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  onSubmit() {
    this.submitted = true;
    const stockData = {
      name: this.addStockForm.get('name').value,
      description: this.addStockForm.get('description').value
    } as IAddStock;
    this.StockService.addStock(stockData, 1)
      .subscribe(res => {
        if (res) {
          // toast stock added
        }
      },
      error => {
        this.error = error.error;
        this.invalidate();
      });
  }
  private invalidate() {
    this.addStockForm.get('name').setErrors({ incorrect: true });
  }
}
