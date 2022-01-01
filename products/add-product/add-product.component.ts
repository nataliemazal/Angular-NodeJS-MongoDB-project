import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Unsubscribe } from 'redux';
import CartModel from 'src/app/models/cart.model';
import CategoryModel from 'src/app/models/category.model';
import ProductModel from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  private unsubscribeMe: Unsubscribe;
  public categories: CategoryModel[];
  //for Admin :
  public isAdmin: boolean | undefined =
    store.getState().authState.user?.isAdmin;
  public productToAdd = new ProductModel();

  public product = new ProductModel();
  public addProductForm: FormGroup;

  public addProductNameControl: FormControl;
  public addPriceControl: FormControl;
  public addCategoryControl: FormControl;
  public addImageControl: FormControl;

  constructor(
    private myProductsService: ProductsService,
    private notify: NotifyService
  ) {
    this.addProductNameControl = new FormControl(null, Validators.required);
    this.addPriceControl = new FormControl(null, Validators.required);
    this.addCategoryControl = new FormControl(null, Validators.required);
    this.addImageControl = new FormControl(null, Validators.required);

    this.addProductForm = new FormGroup({
      addProductNameControl: this.addProductNameControl,
      addPriceControl: this.addPriceControl,
      addCategoryControl: this.addCategoryControl,
      addImageControl: this.addImageControl,
    });
  }

  async ngOnInit() {
    this.unsubscribeMe = store.subscribe(() => {
      this.isAdmin = store.getState().authState.user?.isAdmin;
    });

    try {
      this.categories = await this.myProductsService.getCategoriesAsync();
    } catch (error: any) {
      this.notify.error(error);
    }
  }

  public saveImage(args: Event): void {
    this.productToAdd.imageFile = (args.target as HTMLInputElement).files;
  }

  public async addProduct() {
    try {
      this.productToAdd.productName = this.addProductNameControl.value;
      this.productToAdd.price = this.addPriceControl.value;
      this.productToAdd.categoryId = this.addCategoryControl.value;

      await this.myProductsService.addProduct(this.productToAdd);
      this.addProductForm.reset();
    } catch (error) {}
  }

  ngOnDestroy(): void {
    this.unsubscribeMe();
  }
}
