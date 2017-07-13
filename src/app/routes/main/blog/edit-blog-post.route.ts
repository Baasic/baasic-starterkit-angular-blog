import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from 'baasic-sdk-angular';
import { BlogService } from 'common/data';
import { LoaderService } from 'common';

@Component({
    selector: 'baasic-edit-blog-post',
    template: `
        <baasic-blog-post [isNew]="false" [blog]="blog" (onSave)="backToDetails()" (onCancel)="backToDetails()"></baasic-blog-post>
    `
})
export class EditBlogPostRoute implements OnInit {

    blog: IArticle;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private loaderService: LoaderService,
        private blogService: BlogService
    ) { }

    async ngOnInit(): Promise<void> {
        this.loaderService.suspend();

        const blogSlug = this.route.snapshot.params['slug'];

        this.blog = await this.blogService.get(blogSlug, {              
            embed: 'tags'
        });

        this.loaderService.resume();
    }

    backToDetails(): void {
        const blogSlug = this.route.snapshot.params['slug'];
        this.router.navigate(['/blog-post', blogSlug]);
    }
}