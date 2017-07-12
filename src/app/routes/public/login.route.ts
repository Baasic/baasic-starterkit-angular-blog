import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginService } from 'common/security';
import { TokenService } from 'shared';

@Component({
    templateUrl: 'login.route.html'
})
export class LoginRoute implements OnInit {
    form: FormGroup;
    username: string;
    password: string;
    loginError: string;
    logging: boolean = false;

    constructor(
        public location: Location,
        public loginService: LoginService,
        public router: Router,
        private tokenService: TokenService
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        // clear all app cache
        this.tokenService.removeToken();
        this.tokenService.removeUser();
    }

    private createForm(): void {
        let form: any = {
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        };

        this.form = new FormGroup(form);
    }

    async login(): Promise<void> {
        let data = this.form.getRawValue();
        if (!this.form.valid) {
            this.loginError = 'Username and password required.';
            return;
        }

        try {
            this.logging = true;
            await this.loginService.login(data.username, data.password);
            let currentPath = this.location.path(false);
            this.router.navigate([currentPath !== '/login' ? currentPath : '/home']);
        }
        catch (exception) {
            this.logging = false;
            if (exception.status === 400) {
                if (exception.data.error === 'invalid_grant') {
                    this.loginError = 'Invalid email, username or password';
                } else {
                    this.loginError = exception.data.error_description;
                }
            } else {
                this.loginError = exception.data.message;
            }
        }
    }
}
