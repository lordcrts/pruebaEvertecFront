import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from './login.service';
import * as Auth from './actions/auth.action'
import * as fromAuth from '../reducers/reducers'
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  submit: boolean;

  error$ = this.store.select( fromAuth.getAuthError)

  constructor(private store: Store<any>,
              private _formBuilder: FormBuilder){
      this.form = this._formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
  })
}
  // constructor(private _formBuilder: FormBuilder,
  //             private _loginService: LoginService,
  //             private _router: Router,) { 

  //   this.form = this._formBuilder.group({
  //     username: [null, Validators.required],
  //     password: [null, Validators.required],

  //   })
  // }

  ngOnInit(): void {
  }

  get username(): AbstractControl {
    return this.form.get('username');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }
  loginSubmit(){
    const formValue = this.form.value;
    this.store.dispatch(new Auth.LoginUser({username:formValue.username, password:formValue.password}))
  }

  // loginSubmit() {
  //   const formValue = this.form.value;
  //   const errors = {};
  //   if (!formValue.username || !formValue.password) {
  //     return;
  //   }
  //   this.loading = true;
  //   this.submit = true;

  //   this._loginService.login(formValue.username, formValue.password).pipe(first()).subscribe(data => {
  //     this._router.navigate(['/']);
  //     this.loading = false;
  //   }, error => {
  //     console.log(error)
  //     this.loading = false;
  //     this.submit = false;
  //     errors[error.error.non_field_errors] = true;
  //     this.password.setErrors(errors);
  //   });
  // }

  objToArray(obj: any): any[] {
    return obj !== null ? Object.keys(obj) : [];
  }

}
