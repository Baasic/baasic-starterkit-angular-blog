import { Component, OnInit } from '@angular/core';
import { BaasicAppService } from 'baasic-sdk-angular';
import { UtilityService } from 'common';

@Component({
    selector: 'baasic-sidebar',
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {

    private user: any;

    constructor(
        private baasicAppService: BaasicAppService,
        private utilityService: UtilityService
    ) { }

    async ngOnInit(): Promise<void> { 
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