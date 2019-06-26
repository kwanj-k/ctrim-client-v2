import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { StoresService } from 'src/app/stores/services/stores.service';
import { IStore, IAddStore } from './interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  stores: IStore[];
  isLoading: boolean = true;
  storesExists: boolean = false;
  addStoreForm = this.fb.group({
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
  })
  constructor(
    private storesService: StoresService,
    private fb: FormBuilder,
    private _router: Router
  ) { }
  showModal: boolean = false;
  ngOnInit() {
    this.getStores()
  }
  onClose(): void {
    this.showModal = false;
  }
  onOpen(): void {
    this.showModal = true;
  }

  getStores(): void {
    this.storesService.getStores().subscribe(
      stores => {
        this.isLoading = false;
        if (stores.length < 1){
          this.storesExists = true
        }
        this.stores = stores
      }
      
    )
  }

  onSubmit() {
    const storeData = <IAddStore> {
      name: this.addStoreForm.get('name').value,
      description: this.addStoreForm.get('description').value
    }
    this.storesService.addStore(storeData)
      .subscribe(res => {
        if (res) {
          this.showModal = false;
          this.getStores()
        }
      })
  }

}
