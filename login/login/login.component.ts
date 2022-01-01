import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import CartModel from 'src/app/models/cart.model';
import CredentialsModel from 'src/app/models/credentials.model';
import UserModel from 'src/app/models/user.model';

import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public credentials = new CredentialsModel();
  public userStatus: any;
  public cart = new CartModel();

  public user: UserModel | null = store.getState().authState.user;
  private unsubscribeMe: Unsubscribe;

  constructor(
    private myAuthService: AuthService,
    private notify: NotifyService,
    private myRouter: Router
  ) {}

  ngOnInit() {
    this.unsubscribeMe = store.subscribe(() => {
      this.user = store.getState().authState.user;
    });
  }

  public async login() {
    try {
      const userLoggedIn = await this.myAuthService.login(this.credentials);
      if (userLoggedIn.isAdmin === true) {
        this.myRouter.navigateByUrl('/productsPage');
        return;
      }

      this.notify.success('You are logged-in! ;-)');
      this.myRouter.navigateByUrl('/');
      this.myRouter.navigateByUrl('/');
    } catch (err: any) {
      if (err.status === 401) {
        this.notify.error('Incorrect user name or password');
        return;
      }
      this.notify.error(err);
    }
  }
  ngOnDestroy(): void {
    this.unsubscribeMe();
  }
}
