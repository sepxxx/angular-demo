import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { User } from '../shared/helpers';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        try{
            return this.http.get<User[]>(`${environment.apiUrl}/users`);
        } catch(ErrorInterceptor) {
            return this.http.get<User[]>(`${environment.apiUrl}/users`);
        }
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }
}