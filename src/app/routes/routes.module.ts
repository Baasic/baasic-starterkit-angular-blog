import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'angular2-markdown';
import { MtCommonModule } from 'common';
import { MtComponentsModule } from 'components';
import { NoContentRoute } from 'routes';
import { NewBlogPostRoute, EditBlogPostRoute } from 'routes/master';
import { BlogSearchResultRoute, ProfileDetailRoute, HomeRoute } from 'routes/master/main';
import { 
    BlogPostDetailsRoute,
    LoginRoute, 
    RegisterRoute,
    SignUpRoute
 } from 'routes/main';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MtCommonModule,
        MtComponentsModule,
        MarkdownModule.forRoot()
    ],
    declarations: [
        // public
        HomeRoute,
        LoginRoute,
        SignUpRoute,
        NoContentRoute,
        BlogPostDetailsRoute,
        RegisterRoute,
        // main
        NewBlogPostRoute,
        EditBlogPostRoute,
        ProfileDetailRoute,
        BlogSearchResultRoute
    ],
    exports: [
        HomeRoute,
        LoginRoute,
        SignUpRoute,
        NoContentRoute,
        NewBlogPostRoute,
        EditBlogPostRoute,
        BlogPostDetailsRoute,
        BlogSearchResultRoute,
        RegisterRoute
    ]
})
export class MtRoutesModule { }
