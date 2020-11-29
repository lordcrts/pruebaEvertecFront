import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorErrorService } from './@core/interceptor-errors.service';
import { InterceptorService } from './@core/interceptor.service';
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { reducer, metaReducers } from './reducers/reducers';
import { environment } from 'src/environments/environment';
import { AuthEffects } from './login/effects/auth.effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    StoreModule.forRoot(reducer, { metaReducers }),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      name:'ngrx',
      logOnly:environment.production,
      maxAge: 25
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorErrorService, multi: true },
],
  bootstrap: [AppComponent],
})
export class AppModule { }
