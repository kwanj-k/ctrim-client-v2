import {Component } from '@angular/core';
import { Router } from '@angular/router';

import { navItems } from '../../_nav';
import { LogoutService } from '../../services/logout.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

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
