import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ErrorService, HttpService, UserEventingService, UtilityService } from 'common';
import { BlogService, ResourceService} from 'common/data';
import { LoginService, SignUpService } from 'common/security';
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
        UserEventingService,
        UtilityService,
        //common/data
        BlogService,
        //common/security
        LoginService,
        SignUpService
    ]
})
export class MtCommonModule { }
