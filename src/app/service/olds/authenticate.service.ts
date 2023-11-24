import { Injectable } from '@angular/core';
import {Router} from '@angular/router'
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs'
import {map} from 'rxjs/operators'
import {User} from '../../shared/helpers'
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private userSubject: BehaviorSubject <User|null>;
  public user: Observable<User | null>;

  constructor(private router: Router, private http: HttpClient) { 
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser')!) || null);
    //забрали из локал стораджа либо юзера либо налл
    //положили в переменную как Observable
    this.user=this.userSubject.asObservable();

  }
  login(username:string, password:string) {
    var formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post<any>('/authenticate', formData, {withCredentials: true})
    .pipe(
      map(
        user=> {
          if(false) {
            this.userSubject.next(null);
            return throwError(() => 'Auth error');
          } else {
            localStorage.setItem('currentUser', JSON.stringify(user))
            this.userSubject.next(user);
          }
        }
      )
    );
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

}
