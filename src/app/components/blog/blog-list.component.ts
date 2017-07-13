import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from 'common';
import { BlogService } from 'common/data';
import { IBlogUser } from 'common/security';

@Component({
    selector: 'baasic-blog-list',
    templateUrl: 'blog-list.component.html'
})
export class BlogListComponent implements OnInit {
    
    @Input('pageSize') pageSize: number = 10;
    @Input('user') user: IBlogUser;

    public blogList: any;
    public hasBlogs: boolean = true;
    public pagerDate: any;
    
    constructor(
        private blogService: BlogService,
        private loaderService: LoaderService
    ) { }

    async ngOnInit(): Promise<void> { 
        this.loaderService.suspend();
        
        await this.loadBlogs();

        this.loaderService.resume();
    }

    async loadBlogs(): Promise<void> {
        let blogList = await this.blogService.find({
            statuses: ['published'],
            pageNumber: 1,
            pageSize: this.pageSize,
            orderBy: 'publishDate',
            orderDirection: 'desc'
        });

        this.pagerDate = {
            currentPage: blogList.page,
            pageSize: blogList.recordsPerPage,
            totalRecords: blogList.totalRecords
        };
        
        this.blogList = blogList;
            
        this.hasBlogs = blogList.totalRecords > 0;
    }
}