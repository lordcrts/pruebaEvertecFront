import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class InterceptorErrorService {

  constructor(
              private router: Router,
              private _snackBar: MatSnackBar,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(request).pipe(catchError ((erro:HttpErrorResponse) => {
      console.log(erro)
      //Controlar los errores segun las peticiones, esto esta por definir
      if(erro.status === 401){
        localStorage.clear()
        this.router.navigate(['/login'])
      }else if (erro.status === 403){
        localStorage.clear()
        this.router.navigate(['/login'])
      }else if (erro.status === 500){
        this._snackBar.open('Se ha presentado un error en el servidor, por favor inténtelo nuevamente en unos minutos.', 'Aceptar',{
            duration: 500,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        }            
        );
      }
      const error = erro || erro.message;
      return throwError(error);
    }))
  }
  
}
