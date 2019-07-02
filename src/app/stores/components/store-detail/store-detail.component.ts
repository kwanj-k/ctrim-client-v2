import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  onBack(): void {
    this._router.navigate(['stores']);
  }

}
