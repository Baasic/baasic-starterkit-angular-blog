import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { IArticleComment } from 'baasic-sdk-angular';
import { LoaderService } from 'common';
import { BlogService, IBlog } from 'common/data';

@Component({
    selector: 'baasic-blog-comments',
    templateUrl: 'comments.component.html'
})

export class CommentsComponent implements OnInit {

    @Input('articleId') articleId: string;
    @Input('blog') blog: IBlog;

    form: FormGroup;

    comments: IArticleComment[];
    hasComments: boolean;

    constructor(
        private blogService: BlogService,
        private route: ActivatedRoute,
        private loaderService: LoaderService
    ) { 
        this.createForm();
    }

    async ngOnInit(): Promise<void> { 
        await this.loadComments();
    }

    private createForm(): void {
        let form: any = {
            author: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            message: new FormControl(null, Validators.required)
        };

        this.form = new FormGroup(form);
    }

    private async loadComments(): Promise<void> {
        this.loaderService.suspend();

        const blogSlug = this.route.snapshot.params['slug'];
        let data;
        if (blogSlug) {
            data = await this.blogService.comments.find(blogSlug, {
                embed: 'user',
                orderBy: 'dateUpdated',
                orderDirection: 'desc',
                pageNumber: 1,
                pageSize: 10
            });
        }

        if (data) {
            this.comments = data.item;
            this.hasComments = data.totalRecords > 0;
        }        

        this.loaderService.resume();
    }

    async saveComments(): Promise<void> {
        this.loaderService.suspend();

        let formData = this.form.getRawValue();

        let options = {
            subscriberAuthor: false
        };

        try {
            await this.blogService.comments.create({
                articleId: this.articleId,
                author: formData.author,
                comment: formData.message,
                email: formData.email,
                options: options
            });
        } catch(err) {
            this.loaderService.resume();
        }

        await this.loadComments();

        this.loaderService.resume();
    }
}