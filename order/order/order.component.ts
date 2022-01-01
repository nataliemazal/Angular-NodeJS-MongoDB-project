import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Unsubscribe } from 'redux';
import CartItemModel from 'src/app/models/cartItem.model';
import OrderModel from 'src/app/models/order.model';
import ProductModel from 'src/app/models/product.model';
import * as moment from 'moment';

import store from 'src/app/redux/store';

import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  // my cart:
  public products: ProductModel[];
  public cartDetails: any = 0;
  public cartItems: CartItemModel[];
  private cartId: string;
  public totalAmount: number = store.getState().orderState.totalAmount;
  public imageUrl = 'http://localhost:3001/api/images/';
  private unsubscribeMe: Unsubscribe;

  //order:
  private orderDetails = new OrderModel();
  public fullShippingDates: [];
  public orderForm: FormGroup;
  public shippingDateControl: FormControl;
  public cityControl: FormControl;
  public streetControl: FormControl;
  public creditCardControl: FormControl;

  constructor(
    private notify: NotifyService,
    private myOrdersService: OrdersService,
    private myRouter: Router
  ) {
    (this.shippingDateControl = new FormControl(null, Validators.required)),
      (this.cityControl = new FormControl(null, Validators.required)),
      (this.streetControl = new FormControl(null, Validators.required)),
      (this.creditCardControl = new FormControl(null, [
        Validators.required,
        Validators.pattern(`^[0-9]{15,16}$`),
      ]));

    this.orderForm = new FormGroup({
      shippingDateControl: this.shippingDateControl,
      cityControl: this.cityControl,
      streetControl: this.streetControl,
      creditCardControl: this.creditCardControl,
    });
  }

  async ngOnInit() {
    this.unsubscribeMe = store.subscribe(() => {
      this.cartId = store.getState().orderState.userCartId;
      this.cartItems = store.getState().orderState.cart;

      this.totalAmount = store.getState().orderState.totalAmount;
    });
    try {
      this.cartId = await this.myOrdersService.getCartId();

      const cartItems = await this.myOrdersService.getCartItemsByCartId(
        this.cartId
      );

      this.cartItems = cartItems;
    } catch (error: any) {
      this.notify.error(error);
    }
  }
  async setdetails(event: Event) {
    let fieldName = (event.target as HTMLInputElement).name;
    const user = localStorage.getItem('user');
    if (user) {
      let userDetails = JSON.parse(user);
      let p;

      if (fieldName === 'city') {
        p = userDetails.city;

        this.cityControl.setValue(userDetails.city);
      }
      if (fieldName === 'street') {
        p = userDetails.street;
        this.streetControl.setValue(userDetails.street);
      }

      (event.target as HTMLInputElement).value = p;
    }
  }

  async createOrder() {
    try {
      this.orderDetails.cartId = this.cartId;
      this.orderDetails.city = this.cityControl.value;
      this.orderDetails.street = this.streetControl.value;
      this.orderDetails.totalPrice = store.getState().orderState.totalAmount;
      this.orderDetails.shippingDate = this.shippingDateControl.value;
      this.orderDetails.userId = store.getState().authState.user?._id;
      const creditCard = this.creditCardControl.value;
      this.orderDetails.creditCard = creditCard.substr(creditCard.length - 4);
      await this.myOrdersService.sendOrder(this.orderDetails);

      this.notify.success('your order sent successfuly ');
      this.myRouter.navigateByUrl('/orderDetails');
    } catch (error) {
      this.notify.error('Error while tring send your order. please try again');
    }
  }

  public async validDate(event: any) {
    const dates = await this.myOrdersService.getFullShippingDates();
    let datesArray = [];
    for (const date of dates) {
      let newDate = moment.utc(date.shippingDate).format('YYYY-MM-DD');
      datesArray.push(newDate);
    }
    const selectedDate = event.target.value;

    function countInArray(array: any, selectedDate: any) {
      return array.filter((item: any) => item == selectedDate).length;
    }

    if (countInArray(datesArray, selectedDate) >= 3) {
      this.shippingDateControl.setErrors({ incorrect: true });
      return;
    }
  }
  ngOnDestroy(): void {
    this.unsubscribeMe();
  }
}
