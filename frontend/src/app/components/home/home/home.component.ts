import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import CartModel from 'src/app/models/cart.model';
import ProductModel from 'src/app/models/product.model';
import UserModel from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public products: ProductModel[];
  public productsLenght: number;
  public totalOrders: number;
  public userStatus: any = store.getState().authState.cartStatus;
  public orderBtn: string = store.getState().authState.btnStartText;
  public cart = new CartModel();
  public user: UserModel | null = store.getState().authState.user;

  private unsubscribeMe: Unsubscribe;

  constructor(
    private notify: NotifyService,
    private myProductsService: ProductsService,
    private myOrdersService: OrdersService,
    private myAuthService: AuthService,
    private myRouter: Router
  ) {}

  async ngOnInit() {
    this.unsubscribeMe = store.subscribe(() => {
      this.orderBtn = store.getState().authState.btnStartText;
      this.user = store.getState().authState.user;
      this.userStatus = store.getState().authState.cartStatus;
    });

    try {
      this.products = await this.myProductsService.getProductsAsync();
      this.productsLenght = this.products.length;
      this.totalOrders = await this.myOrdersService.getTotalOrders();
      await this.myAuthService.userStatus();
    } catch (error: any) {
      this.notify.error(error.message);
    }
  }

  public startBtn() {
    this.myRouter.navigateByUrl('/productsPage');
  }

  ngOnDestroy(): void {
    this.unsubscribeMe();
  }
}
