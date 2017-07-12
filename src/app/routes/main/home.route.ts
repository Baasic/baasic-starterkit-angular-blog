import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaasicAppService, IUser } from 'baasic-sdk-angular';
import { Subscription } from 'rxjs/Subscription';
import { UserEventingService, UtilityService } from 'common';

@Component({
    selector: 'home-route',
    templateUrl: 'home.route.html'
})
export class HomeRoute implements OnInit, OnDestroy {

    private user: IBlogUser;
    private userEventingSubscription: Subscription = null;

    constructor(
        private baasicAppService: BaasicAppService,
        private userEventingService: UserEventingService,
        private utilityService: UtilityService
    ) {}

    async ngOnInit(): Promise<void> { 
        await this.init();

        this.userEventingSubscription = this.userEventingService.logoutEventing$.subscribe(() => {
            this.setEmptyUser();
        });
    }

    ngOnDestroy(): void {
        if (this.userEventingSubscription) {
            this.userEventingSubscription.unsubscribe();
        }
    }

    private async init(): Promise<void> {
        let token = this.baasicAppService.getAccessToken();
        let userDetails;
        if (token) {
            userDetails = (await this.baasicAppService.membershipModule.login.loadUserData({})).data;
        } 

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

        this.user = user;
    }

    setEmptyUser(): void {
        this.user = {
            isAuthenticated: false
        };
    }   
}

export interface IBlogUser extends IUser {
    isAuthenticated: boolean;
    isAdmin?: boolean;
}