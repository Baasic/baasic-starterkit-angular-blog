import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService, UserEventingService } from 'common';
import { BlogService } from 'common/data';
import { IBlogUser, UserService } from 'common/security';

@Component({
    selector: 'baasic-blog-list',
    templateUrl: 'blog-list.component.html'
})
export class BlogListComponent implements OnInit, OnDestroy {
    
    @Input('pageSize') pageSize: number = 10;
    @Input('user') user: IBlogUser;

    public blogList: any;
    public hasBlogs: boolean = true;
    public pagerData: any;

    public paramsSubscription: Subscription;
    public userEventingSubscription: Subscription;
    
    constructor(
        private blogService: BlogService,
        private loaderService: LoaderService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private userEventingService: UserEventingService
    ) { }

    async ngOnInit(): Promise<void> { 
        this.paramsSubscription = this.route.paramMap.subscribe(async (params: ParamMap) => {
            const page = +params.get('page');
            await this.loadBlogs(page);
        });

        this.userEventingSubscription = this.userEventingService.logoutEventing$.subscribe(async () => {
            this.user = await this.userService.getUser();
        });
    }

    ngOnDestroy(): void {
        this.paramsSubscription.unsubscribe();
        this.userEventingSubscription.unsubscribe();
    }

    async loadBlogs(page?: number): Promise<void> {
        this.loaderService.suspend();

        let blogList = await this.blogService.find({
            statuses: ['published'],
            pageNumber: page || 1,
            pageSize: this.pageSize,
            orderBy: 'publishDate',
            orderDirection: 'desc'
        });

        this.pagerData = {
            currentPage: blogList.page,
            pageSize: blogList.recordsPerPage,
            totalRecords: blogList.totalRecords
        };
        
        this.blogList = blogList;
            
        this.hasBlogs = blogList.totalRecords > 0;

        this.loaderService.resume();
    }

    async prev(): Promise<void> {
        this.router.navigate(['/main', { page: this.pagerData.currentPage - 1 }]);
    }

    async next(): Promise<void> {
        this.router.navigate(['/main', { page:  this.pagerData.currentPage + 1 }]);
    }
}