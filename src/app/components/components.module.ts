import { NgModule } from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MtCommonModule } from 'common';
import { 
    LoginComponent, 
    LogoutComponent,
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
        LoginComponent,
        LogoutComponent,
        SidebarComponent,
        SocialLoginComponent
    ],
    exports: [
        LoginComponent,
        LogoutComponent,
        SidebarComponent,
        SocialLoginComponent
    ],
    providers: [
        //components
        COMPILER_PROVIDERS
    ]
})
export class MtComponentsModule { }
