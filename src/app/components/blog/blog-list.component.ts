import { Component, Input, OnInit } from '@angular/core';
import { ArticleService } from 'baasic-sdk-angular';
import { IBlogUser } from 'routes/main';

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
    
    constructor(private articleService: ArticleService) { }

    async ngOnInit(): Promise<void> { 
        await this.loadBlogs();
    }

    async loadBlogs(): Promise<void> {
        let blogList = (await this.articleService.articles.find({
            statuses: ['published'],
            page: 1,
            rpp: this.pageSize,
            orderBy: 'publishDate',
            orderDirection: 'desc'
        })).data;

        this.pagerDate = {
            currentPage: blogList.page,
            pageSize: blogList.recordsPerPage,
            totalRecords: blogList.totalRecords
        };
        
        this.blogList = blogList;
            
        this.hasBlogs = blogList.totalRecords > 0;
    }
}