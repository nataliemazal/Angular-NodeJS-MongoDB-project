import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { Page404Component } from './components/layout/page404/page404.component';
import { OrderSummaryComponent } from './components/order/order-summary/order-summary/order-summary.component';
import { OrderComponent } from './components/order/order/order.component';
import { ProductsPageComponent } from './components/products/products-page/products-page.component';
import { RegisterComponent } from './components/register/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'productsPage',
    canActivate: [AuthGuardService],
    component: ProductsPageComponent,
  },
  { path: 'register', component: RegisterComponent },
  { path: 'order', component: OrderComponent },
  { path: 'orderDetails', component: OrderSummaryComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
