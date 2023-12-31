import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../shared/helpers';
import {AuthenticationService } from '../../service/authentication.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    user: User;
    // userFromApi?: User;

    constructor(
        // private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.user = <User>this.authenticationService.userValue;
    }

    // ngOnInit() {
    //     this.loading = true;
    //     this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
    //         this.loading = false;
    //         this.userFromApi = user;
    //     });
    // }


}