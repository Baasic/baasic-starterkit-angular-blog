import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipService, IRequestPasswordReset } from 'baasic-sdk-angular';
import { TokenService } from 'shared';

@Injectable()
export class LoginService {
    constructor(
        private router: Router,
        private tokenService: TokenService,
        private membershipService: MembershipService
    ) { }

    public loginMessage: string;

    async login(username: string, password: string) {
        let data = {
            username: username,
            password: password,
            options: ['session', 'sliding']
        };
        var token = await this.membershipService.login.login(data);
    }

    async forgotPassword(email: string) {
        let resetObject: IRequestPasswordReset = {
            userName: email,
            recoverUrl: "https://api.baasic.com/v1/clokke-dev/recover-password/"
        };
        await this.membershipService.passwordRecovery.requestReset(resetObject);
    }

    async logout(message?: string) {
        let token = this.tokenService.getToken();
        if (token) {
            await this.membershipService.login.logout(token.token, token.type);
            this.tokenService.removeToken();
        }
        this.tokenService.removeUser();
        this.loginMessage = message;
        this.router.navigate(['/login']);
    }
}
