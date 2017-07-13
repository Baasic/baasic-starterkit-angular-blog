import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MtCommonModule } from 'common';
import { CanActivateGuard } from 'common/security';
import { MainLayout } from 'layouts';
import { NoContentRoute } from 'routes';
import { HomeRoute } from 'routes/public';
import { ProfileDetailRoute } from 'routes/master/main';


@NgModule({
    imports: [
        MtCommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: MainLayout,
                data: {},
                children: [
                    { path: 'main', component: HomeRoute},
                    { path: 'author/:authorId', component: ProfileDetailRoute },
                    { path: '**', component: NoContentRoute },
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
