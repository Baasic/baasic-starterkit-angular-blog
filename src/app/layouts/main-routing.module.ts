import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MtCommonModule } from 'common';
import { CanActivateGuard } from 'common/security';
import { MainLayout } from 'layouts';
import { NoContentRoute } from 'routes';
import { NewBlogPostRoute, EditBlogPostRoute } from 'routes/main';


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
                        path: 'new-blog-post',
                        canActivate: [CanActivateGuard],
                        component: NewBlogPostRoute
                    },
                    {
                        path: 'blog-post/edit/:slug',
                        canActivate: [CanActivateGuard],
                        component: EditBlogPostRoute
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
