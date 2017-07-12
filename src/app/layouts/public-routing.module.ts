import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MtCommonModule } from 'common';
import { PublicLayout } from 'layouts';
import { HomeRoute, LoginRoute, SignUpRoute } from 'routes/public';

@NgModule({
    imports: [
        MtCommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: PublicLayout,
                children: [
                    // temporary workaround - empty path is recognized only in first imported routing module
                    { path: '', redirectTo: '/main', pathMatch: 'full' },
                    { path: 'main', component: HomeRoute},
                    { path: 'login', component: LoginRoute },
                    { path: 'signup', component: SignUpRoute }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class PublicRoutingModule { }