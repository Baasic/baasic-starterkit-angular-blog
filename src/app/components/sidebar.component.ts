import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaasicAppService, IArticleTag } from 'baasic-sdk-angular';
import { UtilityService } from 'common';
import { BlogService } from 'common/data';

@Component({
    selector: 'baasic-sidebar',
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {

    private user: any;
    private tags: IArticleTag[] = [];

    constructor(
        private baasicAppService: BaasicAppService,
        private blogService: BlogService,
        private utilityService: UtilityService,
        private router: Router
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

        this.tags = (await this.blogService.tags.find({ pageSize: 10 })).item;
    }

    newBlogPost(): void {
        this.router.navigate(['/new-blog-post']);
    }

    setEmptyUser(): void {
        this.user = {
            isAuthenticated: false
        };
    }
}