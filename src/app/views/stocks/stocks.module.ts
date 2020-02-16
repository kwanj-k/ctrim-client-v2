import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { StocksComponent } from './stocks.component';
import { StocksRoutingModule } from './stocks-routing.module';



@NgModule({
  imports: [
    FormsModule,
    StocksRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ 
    StocksComponent
  ]
})
export class StocksModule { }
