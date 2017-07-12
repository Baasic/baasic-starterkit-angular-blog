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
    LoginComponent, 
    LogoutComponent,
    MarkdownSyntaxHighlightComponent,
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
        LoginComponent,
        LogoutComponent,
        MarkdownSyntaxHighlightComponent,
        SidebarComponent,
        SocialLoginComponent
    ],
    exports: [
        BlogListComponent,
        BlogPostComponent,
        LoginComponent,
        LogoutComponent,
        MarkdownSyntaxHighlightComponent,
        SidebarComponent,
        SocialLoginComponent
    ],
    providers: [
        //components
        COMPILER_PROVIDERS
    ]
})
export class MtComponentsModule { }
