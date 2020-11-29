import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './@core/autorizacion.guard';

const routes: Routes = [
  {
    path: "",
    canActivate: [LoginGuard],
    children: [
      {
        path:"",
        loadChildren: () => import("./registro/registro.module").then(module => module.RegistroModule)
      },
    ]
  },
  {
    path:"login",
    loadChildren: () => import("./login/login.module").then(module => module.LoginModule)
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
