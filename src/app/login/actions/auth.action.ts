import { Action } from '@ngrx/store';


export enum AuthActionTypes {
    LoggedUser = '[Auth] LOGED_USER',
    LoginUser = '[Auth] LOGED_USER',
    LoginUserError = '[Auth] LOGIN_USER_ERROR',
    LoggedIn = '[Auth] LOGED_USER',
    LogoutAuth = '[Auth] LOGED_USER'
}

export class LoginUser implements Action {
    readonly type = AuthActionTypes.LoginUser
    constructor(public payload: {username: string, password: string}){}
}

export class LoginUserError implements Action {
    readonly type = AuthActionTypes.LoginUserError
    constructor(public payload: {isLogin: boolean}){}
}

export class LoggedUser implements Action {
    readonly type = AuthActionTypes.LoggedUser
    constructor(public payload: {isLogin: boolean, error: boolean, user: any}){}
}

export class LoggedIn implements Action {
    readonly type = AuthActionTypes.LoggedIn
    constructor(public payload: {isLogin: boolean}){}
}

export class LogoutAuth implements Action {
    readonly type = AuthActionTypes.LogoutAuth
    constructor(public payload: {isLogin: boolean}){}
}

export type actions = 
LoggedUser
| LoginUser
| LoginUserError
| LoggedIn
| LogoutAuth