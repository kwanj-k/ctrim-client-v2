import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SuiModule} from 'ng2-semantic-ui';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { StoresComponent } from './stores/components/stores/stores.component';
import { LoaderComponent } from './http-loader/component/loader.component';
import { LoaderService } from './http-loader/services/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { MenuComponent } from './menu/menu.component';
import { StoreDetailComponent } from './stores/components/store-detail/store-detail.component';
import { LineChartComponent } from './animations/components/line-chart/line-chart.component';
import { ChartsModule } from 'ng2-charts';
import { PercentageCardsComponent } from './stores/components/percentage-cards/percentage-cards.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    StoresComponent,
    LoaderComponent,
    MenuComponent,
    StoreDetailComponent,
    LineChartComponent,
    PercentageCardsComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SuiModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ChartsModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
