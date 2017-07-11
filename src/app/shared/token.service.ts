import { Injectable } from '@angular/core';
import { BaasicAppService, IUserInfo } from 'baasic-sdk-angular';
import { IToken } from 'baasic-sdk-angular';

@Injectable()
export class TokenService {

    constructor(
        private baasicAppService: BaasicAppService
    ) {

    }

    getToken(): IToken {
        return this.baasicAppService.getAccessToken();
    }

    async getUser(): Promise<string> {
        let user = localStorage.getItem('user');
        if (user) {
            return user;
        } else {
            let data = (await this.baasicAppService.membershipModule.login.loadUserData({})).data;
            localStorage.setItem('user', data.id);
            return data.id;
        }
    }

    async getUserObject(): Promise<IUserInfo> {
        let user = await this.baasicAppService.membershipModule.login.loadUserData({});

        return user.data;
    }

    async isAuthenticated(): Promise<boolean> {
        return await this.baasicAppService.getUser().isAuthenticated();
    }

    removeToken() {
        return this.baasicAppService.updateAccessToken(null);
    }

    removeUser(): void {
        localStorage.removeItem('user');
    }
}

