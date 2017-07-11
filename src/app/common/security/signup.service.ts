import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'common/security';
import { MembershipService, INewUser, IRole } from 'baasic-sdk-angular';
import { TokenService } from 'shared';

@Injectable()
export class SignUpService {
    constructor(
        private tokenService: TokenService,
        private membershipService: MembershipService
    ) { }

    async signup(username: string, email: string, password: string, confirmPassword: string, autoCreatePassword: boolean = false, sendEmailNotification: boolean = false, roles: string[]) {
        let data: any = {
            username: username,
            name: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            mailUrl: 'http://clokke.io/',
            sendEmailNotification: sendEmailNotification,
            autoCreatePassword: autoCreatePassword,
            isApproved: true
        };
        if (roles && roles.length > 0) {
            data.roles = new Array();
            roles.forEach((value, index) => {
                data.roles.push({
                    name: value
                });
            });
        }
        await this.membershipService.user.create(data);
    }
}