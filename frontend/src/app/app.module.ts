import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { LayoutComponent } from './components/layout/layout/layout.component';
import { HomeComponent } from './components/home/home/home.component';
import { RegisterComponent } from './components/register/register/register.component';
import {
  ProductCardComponent,
  DialogOverviewExampleDialog,
} from './components/products/product-card/product-card.component';

import { ProductsPageComponent } from './components/products/products-page/products-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login/login.component';
import { DialogComponent } from './components/products/dialog/dialog.component';
import { OrderComponent } from './components/order/order/order.component';
import { UserProductsListComponent } from './components/products/user-products-list/user-products-list.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { Page404Component } from './components/layout/page404/page404.component';
import { OrderSummaryComponent } from './components/order/order-summary/order-summary/order-summary.component';
import { MarkResultsPipe } from './pipes/mark-results.pipe';
import { JwtInterceptor } from './services/jwt.interceptor';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    RegisterComponent,
    ProductCardComponent,
    ProductsPageComponent,
    LoginComponent,
    DialogComponent,
    OrderComponent,
    UserProductsListComponent,
    AddProductComponent,
    Page404Component,
    OrderSummaryComponent,
    MarkResultsPipe,
    DialogOverviewExampleDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [LayoutComponent],
})
export class AppModule {}
