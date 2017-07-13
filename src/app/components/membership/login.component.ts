import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { BaasicAppService, IHttpResponse, MembershipService } from 'baasic-sdk-angular';
import { Observable } from 'rxjs/Observable';
import { LoginService, UserService } from 'common/security';
import { TokenService } from 'shared';

@Component({
    selector: 'baasic-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    username: string;
    password: string;
    loginError: string;
    logging: boolean = false;

    constructor(
        public location: Location,
        private baasicAppService: BaasicAppService,
        private membershipService: MembershipService,
        public router: Router,
        private tokenService: TokenService,
        private userService: UserService
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

    async submitLogin(): Promise<void> {
        let formData = this.form.getRawValue();
        if (!this.form.valid) {
            this.loginError = 'Username and password required.';
            return;
        }

        this.logging = true;
        let data = {
            username: formData.username,
            password: formData.password,
            options: ['sliding']
        };

        try {
            await this.membershipService.login.login(data) as IHttpResponse<any>;

            try {
                await this.userService.setUser();
                let data = (await this.membershipService.login.loadUserData({})).data;
                this.baasicAppService.setUser(data);
            } catch(err) {
                this.loginError = err.data.message;
            } finally {
                this.logging = false;
            }

            let currentPath = this.location.path(false);                
            this.router.navigate([currentPath !== '/login' ? currentPath : '/main']);
        }
        catch (err) {
            this.logging = false;
            if (err.statusCode === 400) {
                if (err.data.error === 'invalid_grant') {
                    this.loginError = 'Invalid email, username or password';
                } else {
                    this.loginError = err.data.error_description;
                }
            } else {
                this.loginError = err.data.message;
            }
        }
    }
}
