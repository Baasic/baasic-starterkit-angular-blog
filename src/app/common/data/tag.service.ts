import { Injectable } from '@angular/core';
import { ArticleService, IArticleTag, IBaasicQueryModel } from 'baasic-sdk-angular';

@Injectable()
export class TagService {

    constructor(private articleService: ArticleService) { }
    
    async search(term: string): Promise<IBaasicQueryModel<IArticleTag>> {
        let options = {
            search: term
        };
        return (await this.articleService.tags.find(options)).data;
    }
}