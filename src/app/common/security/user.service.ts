import { Injectable } from '@angular/core';
import { BaasicAppService, IUser } from 'baasic-sdk-angular';
import { UtilityService } from 'common';

@Injectable()
export class UserService {

    private readonly storageKey: string = 'userData';

    constructor(
        private baasicAppService: BaasicAppService,
        private utilityService: UtilityService
    ) { }

    async setUser(): Promise<IBlogUser> {
        let userDetails = (await this.baasicAppService.membershipModule.login.loadUserData({})).data;
        
        let user;
        if (userDetails != null) {
            user = {
                isAuthenticated: true,
                isAdmin: userDetails.roles.indexOf('isAdministrator') !== -1
            };

            this.utilityService.extendObject(user, userDetails);
        } else {
            user = {
                isAuthenticated: false
            };
        }

        localStorage.setItem(this.storageKey, JSON.stringify(user));

        return user;
    }

    async getUser(): Promise<IBlogUser> {
        let token = this.baasicAppService.getAccessToken();
        let userDetails;
        if (token) {
            let user = localStorage.getItem(this.storageKey);
            if (user) {
                return JSON.parse(user);
            } else {
                let user = await this.setUser();

                return user;
            }
        } 
    }

    setEmptyUser(): void {
        let user = {
            isAuthenticated: false
        };

        localStorage.setItem(this.storageKey, JSON.stringify(user));
    }
}

export interface IBlogUser extends IUser {
    isAuthenticated: boolean;
    isAdmin?: boolean;
}