import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../@core/modelos/users.model';

@Injectable({
    providedIn: 'root'
})
export class RegistroService implements Resolve<any> {
    users = [];
    usersChange: BehaviorSubject<User>
    onItemsChanged: BehaviorSubject<any>;
    dataRequest: BehaviorSubject<boolean>;


    constructor(
        private _httpClient: HttpClient
    ) {
        this.usersChange = new BehaviorSubject(null);
        this.users = []
    }


    resolve(): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this._getUsers(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    public _getUsers(): Promise<User> {
        
        const url = `${environment.url}/api/users/?limit=99999`;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url)
                .subscribe((response: any) => {
                    let data = response.results;
                    data = data.filter(x => x.id !== JSON.parse(localStorage.getItem('UserProvertec')).id)
                    this.users = data;
                    this.usersChange.next(data);
                    console.log(data)
                    resolve(response);
                }, reject);
        });
    }

    // Create model
    public create(data: User): Promise<User> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${environment.url}/api/users/`, data)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    public update(data: User,id): Promise<User> {
        return new Promise((resolve, reject) => {
            this._httpClient.patch(`${environment.url}/api/users/${id}/`, data)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    public delete(id): Promise<User> {
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${environment.url}/api/users/${id}/`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
