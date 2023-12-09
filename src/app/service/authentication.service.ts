import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../shared/helpers';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser')!) || null
    );
    this.user = this.userSubject.asObservable();
  }
  public get userValue() {
    return this.userSubject.value;
}

  login(username: string, password: string) {
    // var formData: FormData = new FormData();
    // formData.append('username', username);
    // formData.append('password', password);

    // return this.http
    //   .post<any>('http://localhost:8080/auth/login', formData, { withCredentials: true })
    //   .pipe(
    //     map((user) => {
    //       if (!user['jwtToken']) {
    //         this.userSubject.next(null);
    //         return throwError(() => 'Auth error');
    //       } else {
    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //         this.userSubject.next(user);
    //         return user; // Изменение
    //       }
    //     })
    //   );

    const AuthRequestDto={"username":username, "password":password};
    return this.http
    .post<any>(`${environment.apiUrl}/auth/login`, AuthRequestDto)
    .pipe(
      map((user) => {
        if (!user['accessToken']) {
          this.userSubject.next(null);
          return throwError(() => 'Auth error');
        } else {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
          return user; // Изменение
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  updateAccessToken() {
    // var updatedUser = this.userSubject.value;
    // console.log("updateAccessToken function")
    // if(updatedUser) {
    //   this.http.post<String>(environment.refreshAcessTokenUrl,
    //     {"refreshToken": updatedUser.refreshToken})
    //     .subscribe(token => {
    //           // this.newAccessToken = token;
    //           //теперь его нужно переопределить у юзера
    //           //обновим и в local storage и в самом проекте
    //           console.log("МЫ ПОЛУЧИЛИ ТОКЕН " + token + " И СЕЙЧАС ЕГО ПОМЕНЯЕМ")

    //           console.log("User:" + updatedUser);
    //           console.log("User old atoken:" + updatedUser?.accessToken);
    //           updatedUser!.accessToken = token;
    //           console.log("User new atoken:" + updatedUser?.accessToken);
              
    //           localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    //           this.userSubject.next(updatedUser);
    //       },
    //       error=> {console.log("ОШИБОЧКА")}
    //     )

    // }
    
  }
}