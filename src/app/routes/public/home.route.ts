import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaasicAppService, IUser } from 'baasic-sdk-angular';
import { Subscription } from 'rxjs/Subscription';
import { UserEventingService, UtilityService } from 'common';
import { IBlogUser, UserService } from 'common/security';

@Component({
    selector: 'home-route',
    templateUrl: 'home.route.html'
})
export class HomeRoute implements OnInit, OnDestroy {

    private user: IBlogUser;
    private userEventingSubscription: Subscription = null;
    messageClosed: boolean = false;

    constructor(
        private baasicAppService: BaasicAppService,
        private userEventingService: UserEventingService,
        private utilityService: UtilityService,
        private userService: UserService
    ) {}

    toggleMessage(): void {
        this.messageClosed = !this.messageClosed;
    }

    async ngOnInit(): Promise<void> { 
        this.user = await this.userService.getUser();

        this.userEventingSubscription = this.userEventingService.logoutEventing$.subscribe(() => {
            this.setEmptyUser();
        });
    }

    ngOnDestroy(): void {
        if (this.userEventingSubscription) {
            this.userEventingSubscription.unsubscribe();
        }
    }

    setEmptyUser(): void {
        this.userService.setEmptyUser();
    }   
}