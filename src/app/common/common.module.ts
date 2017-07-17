import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { 
    ErrorService, 
    HttpService, 
    LoaderService,
    UserEventingService, 
    UtilityService 
} from 'common';
import { 
    BlogService, 
    ProfileService,
    ResourceService,
    TagService
} from 'common/data';
import { 
    CanActivateGuard, 
    LoginService, 
    SignUpService,
    UserService
 } from 'common/security';
import { SharedModule } from 'shared';


@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule,
        SharedModule
    ],
    providers: [
        //common
        ErrorService,
        HttpService,
        LoaderService,
        UserEventingService,
        UtilityService,
        //common/data
        BlogService,
        ProfileService,
        TagService,
        //common/security
        CanActivateGuard,
        LoginService,
        SignUpService,
        UserService
    ]
})
export class MtCommonModule { }
