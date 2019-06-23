import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/services/strores/stores.service';
import { IStore } from 'src/app/common/interfaces/user';

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
