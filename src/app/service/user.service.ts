import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { User } from '../shared/helpers';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    
    private usersSubject: BehaviorSubject<User[] | null>;
    public currentUsers: Observable<User[]|null>;

    constructor(private http: HttpClient) {
        this.usersSubject = new BehaviorSubject<User[]|null> (null);
        this.http.get<any>(`${environment.apiUrl}/users`).subscribe((users)=>{this.usersSubject.next(users)
            // console.log(this.usersSubject.getValue())
        });
        this.currentUsers = this.usersSubject.asObservable();
    }


    triggerUsersUpdate(updatedUser: User) {
        // Находим индекс старого пользователя
        var innerUsers: User[] = [];
       if( this.usersSubject.value) {
            innerUsers = this.usersSubject.value;

            const index = innerUsers.
            findIndex(user => user.id === updatedUser.id);

            if (index !== -1) {
                // Если найден, заменяем его новым пользователем
                innerUsers.splice(index, 1, updatedUser);
            } else {
                // Если не найден, добавляем нового пользователя
                innerUsers.push(updatedUser);
            }

            // Отправляем обновленный массив через Subject
            this.usersSubject.next(innerUsers);
        }
    }
    public get usersValue() {
        return this.usersSubject.value;
    }


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