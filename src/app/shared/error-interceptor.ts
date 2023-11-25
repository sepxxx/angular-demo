import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { AuthenticationService } from '../service/authentication.service';
import { environment } from '../environments/environment'; 

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private http: HttpClient) { }
    newAccessToken!: String;
    intercept(request: HttpRequest<any>, next: HttpHandler, ): Observable<HttpEvent<any>> {
            
        
        const Res = next.handle(request).pipe(catchError(err => {
            const user  = this.authenticationService.userValue
            if ([403].includes(err.status) && user) {
            
                return this.http.post<String>(environment.refreshAcessTokenUrl,
                 {"refreshToken": user.refreshToken})
                 .pipe(first())
                 .subscribe(token => {
                    this.newAccessToken = token;
                    //теперь его нужно переопределить у юзера
                    //обновим и в local storage и в самом проекте
                    this.authenticationService.updateAccessToken(this.newAccessToken);

                    const requestNew = request.clone({ 
                        setHeaders: { 
                            Authorization: "Bearer "+this.newAccessToken
                        },
                    }); 
                    return this.http.request(requestNew);

                });

            }

            const error = err.error.message || err.statusText;
            return throwError(() => error);
        }))
        return Res;
    }
}