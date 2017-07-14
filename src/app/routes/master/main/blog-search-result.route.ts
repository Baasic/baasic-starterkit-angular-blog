import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IBaasicQueryModel } from 'baasic-sdk-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from 'common';
import { BlogService, IBlog } from 'common/data';

@Component({
    selector: 'blog-search-result',
    templateUrl: 'blog-search-result.route.html'
})

export class BlogSearchResultRoute implements OnInit, OnDestroy {

    blogList: IBlog[];

    hasBlogs: boolean;

    private paramsSubscription: Subscription;

    private searchParam: string;
    private tagsParam: string;

    constructor(
        private blogService: BlogService,
        private loaderService: LoaderService,
        private route: ActivatedRoute
    ) { }

    async ngOnInit(): Promise<void> {
        this.paramsSubscription = this.route.paramMap.subscribe(async (params: ParamMap) => {
            this.searchParam = params.get('search');
            this.tagsParam = params.get('tags');

            await this.loadData();
        });
    }

    ngOnDestroy(): void {
        this.paramsSubscription.unsubscribe();
    }

    private async loadData(): Promise<void> {
        this.loaderService.suspend();

        let options: any = {
            fields: ['title', 'slug', 'publishDate', 'excerpt'],
            statuses: ['published'],
            pageSize: 10
        };

        if (this.searchParam) {
            options.search = this.searchParam;
        }

        if (this.tagsParam) {
            options.tags = this.tagsParam;
        }

        try {
            let data = await this.blogService.find(options);   

            if (data) {
                this.parseBlogList(data);
            }
        } catch(err) {
            console.log(err);
        } finally {
            this.loaderService.resume();
        }
    }

    private parseBlogList(data: IBaasicQueryModel<IBlog>): void {
        this.blogList = data.item;
        
        this.hasBlogs = data.totalRecords > 0;
    }

    async prevPage(): Promise<void> {
        console.log("PREV");
    }

    async nextPage(): Promise<void> {
        console.log("NEXT");
    }
}