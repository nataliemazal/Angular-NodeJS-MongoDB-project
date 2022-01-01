import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import UserModel from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class RegisterComponent implements OnInit {
  public user = new UserModel();
  public firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;

  public cities = [
    'Jerusalem',
    'Tel Aviv Jaffa',
    'Haifa',
    'Rishon Lezion',
    'Petah Tiqw',
    'Ashdod',
    'Netanya',
    'Ramat Gan',
    'Beer Sheva',
    'Holon',
  ];

  private passwordConfirmed: boolean = false;

  public firstNameController: FormControl;
  public lastName: FormControl;
  public id: FormControl;
  public userName: FormControl;
  public address: FormControl;
  public password: FormControl;
  public confirmPass: FormControl;

  constructor(
    private myAuthService: AuthService,
    private notify: NotifyService,
    private myRouter: Router,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group(
      {
        firstNameController: ['', Validators.required],
        lastName: ['', Validators.required],
        id: ['', Validators.required],

        userName: [
          '',
          [
            Validators.required,
            Validators.pattern(
              `^[A-Z,a-z,0-9,.,_]+[@]+[A-Z,a-z,0-9]+[.]+[A-Z,a-z,.]{2,5}$`
            ),
          ],
        ],

        password: ['', Validators.required],
        confirmPass: ['', Validators.required],
      },
      { validator: this.checkIfMatchingPasswords('password', 'confirmPass') }
    );

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  checkIfMatchingPasswords(
    passwordKey: string,
    passwordConfirmationKey: string
  ) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  public async register() {
    try {
      const isRegistered = await this.myAuthService.register(this.user);

      this.notify.success('You are registered! ;-)');
      this.myRouter.navigateByUrl('/');
    } catch (err: any) {
      if (err.status === 400) {
        this.notify.error('user already exist');
      } else {
        this.notify.error(err);
      }
    }
  }
}
