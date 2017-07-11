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
    errorMessage: string;

    constructor(
        public location: Location,
        public loginService: LoginService,
        public router: Router,
        private tokenService: TokenService
    ) {
        this.errorMessage = loginService.loginMessage;
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
            this.errorMessage = 'Username and password required.';
            return;
        }

        try {
            await this.loginService.login(data.username, data.password);
            let currentPath = this.location.path(false);
            this.router.navigate([currentPath !== '/login' ? currentPath : '/dashboard']);
        }
        catch (exception) {
            this.errorMessage = 'Wrong username or password.';
        }
    }
}
