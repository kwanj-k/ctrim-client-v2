import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { StoresService } from 'src/app/stores/services/stores.service';
import { IStore, IAddStore } from '../../interfaces';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  stores: IStore[];
  isLoading = true;
  storesExists = false;
  submitted = false;
  error: string;
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
  });
  constructor(
    private storesService: StoresService,
    private fb: FormBuilder  ) { }
  showModal = false;
  ngOnInit() {
    this.getStores();
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
        if (stores.length < 1) {
          this.storesExists = true;
        }
        this.stores = stores;
      }

    );
  }

  onSubmit() {
    this.submitted = true;
    const storeData = {
      name: this.addStoreForm.get('name').value,
      description: this.addStoreForm.get('description').value
    } as IAddStore;
    this.storesService.addStore(storeData)
      .subscribe(res => {
        if (res) {
          this.showModal = false;
          this.getStores();
        }
      },
      error => {
        this.error = error.error;
        this.invalidate();
      });
  }
  private invalidate() {
    this.addStoreForm.get('name').setErrors({ incorrect: true });
  }
}
