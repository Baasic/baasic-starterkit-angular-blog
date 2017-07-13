import { Injectable } from '@angular/core';
import { 
    ArticleService, 
    IArticle,
    IArticleComment,
    IArticleCommentReply,
    IArticleOptions,
    IBaasicQueryModel, 
    IOptions, 
    IArticleTag
} from 'baasic-sdk-angular';
import { HttpService, UtilityService } from 'common';

@Injectable()
export class BlogService {

    constructor(
        private articleService: ArticleService,
        private httpService: HttpService,
        private utilityService: UtilityService
    ) { }


    get blogStatus(): IBlogStatus {
        return {
            draft: 1,
            published: 2,
            archived: 4
        };
    }

    async get(id: string, options: IArticleSearchOptions): Promise<IArticle> {
        return (await this.articleService.articles.get(id, options)).data;
    }

    async find(options: IArticleSearchOptions): Promise<IBaasicQueryModel<IArticle>> {
        let findOptions;
        if (options) {
            findOptions = this.utilityService.copyObject({}, options);
        } else {
            findOptions = {};
        }

        let searchQuery: string = findOptions.searchQuery || '';
        let lowerQuery: string = searchQuery.toLowerCase();
        let whereIndex: number = lowerQuery.indexOf(' where ');

        if (whereIndex !== -1) {
            whereIndex = whereIndex + 8;
            searchQuery = searchQuery.substring(0, whereIndex) + 'isBlog = 1 AND (' + searchQuery.substring(whereIndex) + ')';
        } else {
            searchQuery = 'WHERE isBlog = 1';
        }

        findOptions.searchQuery = searchQuery;

        return (await this.articleService.articles.find(findOptions)).data;
    }

    async create(blog: IArticle): Promise<IArticle> {
        let blogToCreate = this.utilityService.copyObject({}, blog);

        blogToCreate.isBlog = 1;

        return (await this.articleService.articles.create(blogToCreate)).data;
    }

    async update(blog: IArticle): Promise<void> {
        return (await this.articleService.articles.update(blog)).data;
    }

    async remove(blog: IArticle): Promise<void> {
        return (await this.articleService.articles.remove(blog)).data;
    }

    async unpublish(blog: IArticle): Promise<void> {
        return (await this.articleService.articles.unpublish(blog)).data;
    }

    async publish(blog: IArticle, options: IArticleOptions): Promise<void> {
        return (await this.articleService.articles.publish(blog, options)).data;
    }

    async next(blogList: any): Promise<any> {
        let nextLink = blogList.links('next');
        if (nextLink) {
            return this.httpService.get(nextLink.href);
        }
    }

    async previous(blogList: any): Promise<any> {
        let prevLink = blogList.links('previous');
        if (prevLink) {
            return this.httpService.get(prevLink.href);
        }
    }

    get tags(): any {
        let that = this;
        return {
            find: async function(options: IOptions): Promise<IBaasicQueryModel<IArticleTag>> {
                return (await that.articleService.tags.find(options)).data;
            }
        };
    }

    get comments(): any {
        let that = this;
        return {
            find: async function(id: string, options: IOptions): Promise<IBaasicQueryModel<IArticleComment>> {
                return (await that.articleService.articles.comments.find(id, options)).data;
            },

            create: async function(articleId: string, data: IArticleComment): Promise<IArticleComment> {
                data.articleId = articleId;

                return (await that.articleService.articles.comments.create(data)).data;
            },

            next: function(comments: any): Promise<any> {
                let nextLink = comments.links('next');
                if (nextLink) {
                    return that.httpService.get(nextLink.href);
                }
            },

            previous: function(comments: any): Promise<any> {
                let prevLink = comments.links('previous');
                if (prevLink) {
                    return that.httpService.get(prevLink.href);
                }
            },

            replies: {
                find: async function(articleId: string, commentId: string, options?: IOptions): Promise<IBaasicQueryModel<IArticleCommentReply>> {
                    return (await that.articleService.articles.comments.replies.find(articleId, commentId, options)).data;
                },

                create: async function(reply: IArticleCommentReply): Promise<IArticleCommentReply> {
                    return (await that.articleService.comments.commentReplies.create(reply)).data;
                }
            }
        };
    }

}

export interface IArticleSearchOptions extends IOptions {
    statuses?: string[];
    tags?: string[];
    startDate?: string;
    endDate?: string;
}

export interface IBlogStatus {
    draft: number;
    published: number;
    archived: number;
}