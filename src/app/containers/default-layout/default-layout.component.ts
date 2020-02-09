import {Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, Validators } from '@angular/forms'

import { navItems } from '../../_nav';
import { LogoutService } from '../../services/logout.service';
import { IAddStore } from '../../interfaces/store';



@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'

})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  @ViewChild('primaryModal') public primaryModal: ModalDirective;

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
    private logoutService: LogoutService,
    private router: Router,
    private fb: FormBuilder  
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
    const storeData = {
      name: this.addStoreForm.get('name').value,
      description: this.addStoreForm.get('description').value
    } as IAddStore;
    // this.storesService.addStore(storeData)
    //   .subscribe(res => {
    //     if (res) {
    //       // toast store added
    //     }
    //   },
    //   error => {
    //     this.error = error.error;
    //     this.invalidate();
    //   });
  }
  private invalidate() {
    this.addStoreForm.get('name').setErrors({ incorrect: true });
  }
}
