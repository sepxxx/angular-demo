import { Injectable } from '@angular/core'; 
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { Observable, of, throwError } from 'rxjs'; 
import { delay, materialize, dematerialize } from 'rxjs/operators';

// import {error} from 'console';
// import {ok} from 'assert';
import { Role } from './helpers';

const users = [
    {id:1, username: "admin", password: "admin", firstName: "Ivan", lastName: "Ivanov", role: Role.Admin},
    {id:2, username: "user", password: "user", firstName: "Oleg", lastName: "Pavlov", role: Role.User},
]

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const{url, method, headers, body} = req;
        return handleRoute();


        function authenticate() {
            const {username, password} = body;
            const user = users.find(x=>x.username === username && 
                x.password === password)
            if(!user) return error ('User not found!');
            return ok({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                role: user.role,
                jwtToken: `fake-jwt-token.${user.id}`
            });
        }
        function getUsers() {
            if(!isLogged()) return unauthorized();
            return ok(users);
        }

        function isLogged() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token')
        }

        function handleRoute() {
            switch(true) {
                case url.endsWith('/authenticate') && method=='POST':
                    return authenticate();
                case url.endsWith('/users') && method=='POST':
                    return getUsers();
                default:
                    return next.handle(req);
            }
        }


        function error(message: string) { 
            return throwError(() => ({ status: 400, error: { message } })) 
                .pipe(materialize(), delay(500), dematerialize()); 
        }


        function ok(body: any) { 
            return of(new HttpResponse({ status: 200, body })) 
                .pipe(delay(500)); // delay observable to simulate server api call 
        }

        function unauthorized() { 
            return throwError(() => ({ status: 401, error: { message: 'unauthorized' } })) 
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648); 
        }
    }
}

export const FakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true //если бы был false, то после отработки, другие не работали
}