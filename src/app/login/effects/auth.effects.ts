import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthActionTypes, LoggedUser, LoginUser, LoginUserError } from '../actions/auth.action';
import { LoginService } from '../login.service';

@Injectable({
    providedIn: 'root'
})

export class AuthEffects{
    @Effect()
    LoginUserError$: Observable<Action> = this.actions$.pipe(
        ofType<LoginUserError>(AuthActionTypes.LoginUserError),
        tap(v => console.log('LoggedAPI error', v.payload)),
        map(data => {
            return {type: 'LOGIN_API_ERROR', payload: 'Username or Password incorrect'};
        })
    )

    @Effect()
    LoginUser: Observable<Action> = this.actions$.pipe(
        ofType<LoginUser>(AuthActionTypes.LoginUser),
        tap(v => console.log('LoginUser effect', v)),
        map(action => action.payload),
        exhaustMap(auth => {
            return this.authService.login(auth.username,auth.password).pipe(
                map(response => new LoggedUser(response)),
                catchError(error => of(new LoginUserError(error)))
            );
        })
    )

    @Effect({dispatch: false})
    LoggedUser$: Observable<Action> = this.actions$.pipe(
        ofType<LoggedUser>(AuthActionTypes.LoggedUser),
        tap(v => this.router.navigate(['/'])),
    )

    constructor(private http: HttpClient,
                private actions$: Actions,
                private authService: LoginService,
                private router: Router){

                }
}