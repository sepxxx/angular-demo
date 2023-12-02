import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first, switchMap } from 'rxjs/operators';

import { AuthenticationService } from '../service/authentication.service';
import { environment } from '../environments/environment'; 

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//     constructor(private authenticationService: AuthenticationService, private http: HttpClient) { }
//     newAccessToken!: String;
//     intercept(request: HttpRequest<any>, next: HttpHandler, ): Observable<HttpEvent<any>> {
        
//         return next.handle(request).pipe(catchError(err => {
//             const user  = this.authenticationService.userValue
//             if ([403].includes(err.status) && user) {
            
//                 return this.http.post<String>(environment.refreshAcessTokenUrl,
//                  {"refreshToken": user.refreshToken})
//                  .pipe(first())
//                  .subscribe(token => {
//                     this.newAccessToken = token;
//                     //теперь его нужно переопределить у юзера
//                     //обновим и в local storage и в самом проекте
//                     this.authenticationService.updateAccessToken(this.newAccessToken);

//                     const requestNew = request.clone({ 
//                         setHeaders: { 
//                             Authorization: "Bearer "+this.newAccessToken
//                         },
//                     }); 
//                     // return this.http.request(requestNew);
//                     // return next.handle(requestNew);


//                 });

//             }
//             // return next.handle(request);

//             const error = err.error.message || err.statusText;
//             return throwError(() => error);
//         }))
//     }

// }


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    // newAccessToken!: String;

    constructor(private authenticationService: AuthenticationService, private http: HttpClient) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        
        return next.handle(request).pipe(catchError(err => {
    
            const error = err.statusText;
            console.log(err.status)
            if ([401, 403].includes(err.status) && this.authenticationService.userValue) {
                console.log("МЫ БУДЕМ ПЕРЕЗАПРАШИВАТЬ ACESS")
                const user  = this.authenticationService.userValue

                
                this.http.post<String>(environment.refreshAcessTokenUrl,
                 {"refreshToken": user.refreshToken})
                 .subscribe(token => {
                        // this.newAccessToken = token;
                        //теперь его нужно переопределить у юзера
                        //обновим и в local storage и в самом проекте
                        console.log("МЫ ПОЛУЧИЛИ ТОКЕН " + token + " И СЕЙЧАС ЕГО ПОМЕНЯЕМ")
                        this.authenticationService.updateAccessToken(token);
                    }
                 )
            }
        
            return throwError(() => error);
        }))
    }
}