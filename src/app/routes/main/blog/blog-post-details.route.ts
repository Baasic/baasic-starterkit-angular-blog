import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticleTag } from 'baasic-sdk-angular';
import { LoaderService } from 'common';
import { BlogService, IBlog } from 'common/data';
import { IBlogUser, UserService } from 'common/security';

@Component({
    selector: 'baasic-blog-post-details',
    templateUrl: 'blog-post-details.route.html'
})

export class BlogPostDetailsRoute implements OnInit {

    blog: IBlog;
    user: IBlogUser;
    authorId: string;

    content: string = '';

    constructor(
        private route: ActivatedRoute,
        private blogService: BlogService,
        private userService: UserService,
        private loaderService: LoaderService,
        private router: Router
    ) { }

    async ngOnInit(): Promise<void> { 
        await this.loadBlog();
    }

    private async loadBlog(): Promise<void> {
        this.loaderService.suspend();

        const blogSlug = this.route.snapshot.params['slug'];
        this.blog = await this.blogService.get(blogSlug, {
            embed: 'tags'
        });

        this.authorId = this.blog.authorId;
        this.content = this.blog.content;

        this.user = await this.userService.getUser();

        this.loaderService.resume();
    }

    editBlog(): void {
        this.router.navigate(['/blog-post/edit', this.blog.slug]);
    }

    async deleteBlog(): Promise<void> {
        if (confirm('Are you sure you want to delete this post?')) {
            this.loaderService.suspend();

            try {
                await this.blogService.remove(this.blog);
                this.router.navigate(['/main']);
            } catch(err) {
                console.log(err);
            } finally {
                this.loaderService.resume();
            }
        }
    }

    searchTags(tag: IArticleTag): void {
        this.router.navigate(['/blog-search', { tags: tag.slug }]);
    }
}