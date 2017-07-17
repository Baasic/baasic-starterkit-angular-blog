import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SignUpService } from 'common/security';


@Component({
    selector: 'signup-route',
    templateUrl: 'signup.route.html'
})

export class SignUpRoute {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    errorMessage: string;

    constructor(
        private signUpService: SignUpService, 
        private location: Location,
        private router: Router
    ) {}

    async onClickSignUp() {
        await this.signUpService.signup(this.username, this.email, this.password, this.confirmPassword);
        let currentPath = this.location.path(false);
        this.router.navigate([currentPath !== '/signup' ? currentPath : '/home']);
    }
}