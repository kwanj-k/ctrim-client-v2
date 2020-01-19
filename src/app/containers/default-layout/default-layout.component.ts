import {Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap/modal';

import { navItems } from '../../_nav';
import { LogoutService } from '../../services/logout.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'

})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  constructor(
    private logoutService: LogoutService,
    private router: Router) { }
  
    logOut() {
      this.logoutService.logout();
      this.router.navigate(['login']);
      return;
    }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
