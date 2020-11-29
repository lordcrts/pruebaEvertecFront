import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser
    currentUser = JSON.parse(localStorage.getItem('UserProvertec'))
    console.log(currentUser)
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'JWT ' + currentUser.token,
        }
      });
    }
    return next.handle(request);
  }
}
