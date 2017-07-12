import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ErrorService, UtilityService } from 'common';
import { ResourceService} from 'common/data';
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
        UtilityService,
        //common/security
        LoginService,
        SignUpService
    ]
})
export class MtCommonModule { }
