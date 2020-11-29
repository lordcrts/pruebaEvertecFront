import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterceptorErrorService } from '../@core/interceptor-errors.service';
import { InterceptorService } from '../@core/interceptor.service';
import { RegistroComponent } from './registro.component';
import { RegistroService } from './registro.service';

const routes: Routes = [
  {
    path:"",
    component:RegistroComponent,
    resolve: {
      data: RegistroService
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorErrorService, multi: true },
],
  
})
export class RegistroRoutingModule { }
