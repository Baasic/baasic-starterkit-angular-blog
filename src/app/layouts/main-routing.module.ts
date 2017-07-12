import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MtCommonModule } from 'common';
import { MainLayout } from 'layouts';
import { NoContentRoute } from 'routes';
import { HomeRoute } from 'routes/main';


@NgModule({
    imports: [
        MtCommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: MainLayout,
                data: {},
                children: [
                    {
                        path: 'main',
                        component: HomeRoute
                    },
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
