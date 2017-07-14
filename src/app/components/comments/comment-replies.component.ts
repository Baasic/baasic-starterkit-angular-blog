import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IArticleCommentReply } from 'baasic-sdk-angular';
import { LoaderService } from 'common';
import { BlogService } from 'common/data';

@Component({
    selector: 'comment-replies',
    templateUrl: 'comment-replies.component.html'
})

export class CommentRepliesComponent implements OnInit {

    @Input('commentId') commentId: string;
    @Input('articleId') articleId: string;

    active: boolean = false;

    form: FormGroup;

    replies: IArticleCommentReply[];
 
    constructor(
        private blogService: BlogService,
        private loaderService: LoaderService
    ) { 
        this.createForm();
    }

    async ngOnInit(): Promise<void> {
        await this.loadReplies();
    }

    private async loadReplies(): Promise<void> {
        this.loaderService.suspend();

        try {
            let data = await this.blogService.comments.replies.find(this.articleId, this.commentId, {
                embed: ['user'],
                orderBy: 'dateUpdated',
                orderDirection: 'asc',
                pageNumber: 1
            });

            if (data) {
                this.replies = data.item;
            }

        } catch(err) {
            console.log(err);
        } finally {
            this.loaderService.resume();
        }
    } 

    private createForm(): void {
        let form = {
            author: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            message: new FormControl(null, Validators.required)
        };

        this.form = new FormGroup(form);
    }

    async saveReplies(): Promise<void> {
        this.loaderService.suspend();

        let formData = this.form.getRawValue();

        let options = {
            subscribeAuthor: false
        };

        try {
            await this.blogService.comments.replies.create(this.articleId, {
                commentId: this.commentId,
                options: options,
                email: formData.email,
                reply: formData.message,
                author: formData.author
            });
        } catch(err) {
            console.log(err);
        } finally {
            await this.loadReplies();
            this.loaderService.resume();
        }
    }
}