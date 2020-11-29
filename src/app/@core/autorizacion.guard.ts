import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
// import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router,) { }

  canActivate(_route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.user != null) { 
      return true; 
    }

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }


  get user(): any {
    const user = JSON.parse(localStorage.getItem('UserProvertec'));
    if (user) {
      return user;
    }
    return null;
  }
}
