import { NgModule } from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'angular2-markdown';
import { MtCommonModule } from 'common';
import { 
    BlogListComponent,
    BlogPostComponent,
    CommentRepliesComponent,
    CommentsComponent,
    GravatarDirective,
    LoaderComponent,
    LoginComponent, 
    LogoutComponent,
    MarkdownSyntaxHighlightComponent,
    PaginationComponent,
    ProfileComponent,
    ProfileDetailComponent,
    RegisterComponent,
    SidebarComponent,
    SocialLoginComponent 
} from 'components';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MtCommonModule,
        MarkdownModule.forRoot()
    ],
    declarations: [
        BlogListComponent,
        BlogPostComponent,
        CommentRepliesComponent,
        CommentsComponent,
        LoaderComponent,
        LoginComponent,
        LogoutComponent,
        MarkdownSyntaxHighlightComponent,
        PaginationComponent,
        ProfileComponent,
        ProfileDetailComponent,
        RegisterComponent,
        SidebarComponent,
        SocialLoginComponent,
        GravatarDirective
    ],
    exports: [
        BlogListComponent,
        BlogPostComponent,
        CommentRepliesComponent,
        CommentsComponent,
        LoaderComponent,
        LoginComponent,
        LogoutComponent,
        MarkdownSyntaxHighlightComponent,
        PaginationComponent,
        ProfileComponent,
        ProfileDetailComponent,
        RegisterComponent,
        SidebarComponent,
        SocialLoginComponent
    ],
    providers: [
        //components
        COMPILER_PROVIDERS
    ]
})
export class MtComponentsModule { }
