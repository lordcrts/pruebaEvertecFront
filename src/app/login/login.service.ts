import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    public userSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient, private _router: Router,) {
        if(JSON.parse(localStorage.getItem('UserProvertec'))){
            this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('UserProvertec')));
        }else{
            this.userSubject = new BehaviorSubject<any>(null);
        }
        
        this.currentUser = this.userSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.userSubject.value;
    }

    public login(username, password): Observable<any> {
        return this.http.post(`${environment.url}/login/`, { username, password },
            {   //Se añaden los headers en la peticion, para que no de error de cors
                observe: 'response'
            }).pipe(map(user => {
                if(user.body['token']){
                    localStorage.setItem('UserProvertec',JSON.stringify(user.body))
                    this.userSubject.next(user);
                    this._router.navigate(['/']);
                }
                return user;
            }));
    }
}
