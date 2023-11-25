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

  updateAccessToken(newAcessToken:String) {
    const updatedUser = this.userValue;
    updatedUser!.accessToken = newAcessToken;
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    this.userSubject.next(updatedUser);
  }
}