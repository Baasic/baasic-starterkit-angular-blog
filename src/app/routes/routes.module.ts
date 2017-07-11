import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MtCommonModule } from 'common';
import { MtComponentsModule } from 'components';
import { NoContentRoute } from 'routes';
import { HomeRoute } from 'routes/main';
import { LoginRoute, SignUpRoute } from 'routes/public';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MtCommonModule,
        MtComponentsModule,
    ],
    declarations: [
        // public
        HomeRoute,
        LoginRoute,
        SignUpRoute,
        NoContentRoute
    ],
    exports: [
        HomeRoute,
        LoginRoute,
        SignUpRoute,
        NoContentRoute
    ]
})
export class MtRoutesModule { }
