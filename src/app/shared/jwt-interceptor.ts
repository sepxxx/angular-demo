import { Injectable } from '@angular/core'; 
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
 
import { environment } from '../environments/environment'; 
import { AuthenticationService } from '../service/authentication.service'; 
 
@Injectable() 
export class JwtInterceptor implements HttpInterceptor { 
    constructor(private authenticationService: AuthenticationService) { } 
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
        const user = this.authenticationService.userValue; 
        const isLoggedIn = user && user.accessToken; 
        const isRefreshApiUrl = request.url.startsWith(environment.refreshAcessTokenUrl); 
        const isApiUrl = request.url.startsWith(environment.apiUrl); 
        // if (isLoggedIn && isRefreshApiUrl) { 
        //     request = request.clone({ 
        //         setHeaders: { 
        //             Authorization: "Bearer "+user!.refreshToken
        //         } 
        //     }); 
        // } 
        // if (isLoggedIn && isApiUrl && !isRefreshApiUrl) { 
        if (isLoggedIn && isApiUrl && !isRefreshApiUrl) { 

            request = request.clone({ 
                setHeaders: { 
                    Authorization: "Bearer "+user!.accessToken
                } 
            }); 
        } 
        return next.handle(request); 
    } 
}