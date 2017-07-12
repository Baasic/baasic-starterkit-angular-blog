import { NgModule } from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MtCommonModule } from 'common';
import { 
    BlogListComponent,
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
        MtCommonModule
    ],
    declarations: [
        BlogListComponent,
        LoginComponent,
        LogoutComponent,
        MarkdownSyntaxHighlightComponent,
        SidebarComponent,
        SocialLoginComponent
    ],
    exports: [
        BlogListComponent,
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
