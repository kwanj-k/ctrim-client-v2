import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/stores/services/stores.service';
import { IStore } from './interfaces';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  stores: IStore[];
  isLoading: boolean = true;
  constructor(
    private storesService: StoresService
  ) { }

  ngOnInit() {
    this.getStores()
  }

  getStores(): void {
    this.storesService.getStores().subscribe(
      stores => {
        this.isLoading = false;
        this.stores = stores
      }
      
    )
  }

}
