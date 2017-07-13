import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from 'baasic-sdk-angular';
import { BlogService } from 'common/data';
import { IBlogUser, UserService } from 'common/security';

@Component({
    selector: 'baasic-blog-post-details',
    templateUrl: 'blog-post-details.route.html'
})

export class BlogPostDetailsRoute implements OnInit {

    blog: IArticle;
    user: IBlogUser;

    content: string = '';

    constructor(
        private route: ActivatedRoute,
        private blogService: BlogService,
        private userService: UserService
    ) { }

    async ngOnInit(): Promise<void> { 
        const blogSlug = this.route.snapshot.params['slug'];
        this.blog = await this.blogService.get(blogSlug, {
            embed: 'tags'
        });

        this.content = this.blog.content;

        this.user = await this.userService.getUser();
    }
}