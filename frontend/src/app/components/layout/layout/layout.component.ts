import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import UserModel from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  public user: UserModel | null = store.getState().authState.user;
  private unsubscribeMe: Unsubscribe;

  constructor(private myAuthService: AuthService, private myRouter: Router) {}

  ngOnInit(): void {
    this.unsubscribeMe = store.subscribe(() => {
      this.user = store.getState().authState.user;
    });
  }

  public logoutBtn(event: MouseEvent) {
    this.myAuthService.logout();
    this.myRouter.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.unsubscribeMe();
  }
}
