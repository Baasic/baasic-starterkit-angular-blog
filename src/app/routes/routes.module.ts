import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'angular2-markdown';
import { MtCommonModule } from 'common';
import { MtComponentsModule } from 'components';
import { NoContentRoute } from 'routes';
import { HomeRoute, NewBlogPostRoute } from 'routes/main';
import { LoginRoute, SignUpRoute } from 'routes/public';


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
        // main
        NewBlogPostRoute
    ],
    exports: [
        HomeRoute,
        LoginRoute,
        SignUpRoute,
        NoContentRoute,
        NewBlogPostRoute
    ]
})
export class MtRoutesModule { }
