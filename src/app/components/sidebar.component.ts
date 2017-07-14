import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

    searchForm: FormGroup;

    constructor(
        private baasicAppService: BaasicAppService,
        private blogService: BlogService,
        private utilityService: UtilityService,
        private router: Router
    ) { 
        this.createSearchForm();
    }

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

    private createSearchForm(): void {
        this.searchForm = new FormGroup({
            searchFor: new FormControl(null, Validators.required)
        });
    }

    newBlogPost(): void {
        this.router.navigate(['/new-blog-post']);
    }

    setEmptyUser(): void {
        this.user = {
            isAuthenticated: false
        };
    }

    searchBlog(): void {
        let formData = this.searchForm.getRawValue();

        this.router.navigate(['/blog-search', { search: formData.searchFor }]);
    }

    searchTags(tag: IArticleTag): void {
        this.router.navigate(['/blog-search', { tags: tag.slug }]);
    }
}