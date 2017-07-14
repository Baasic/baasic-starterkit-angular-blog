import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MtCommonModule } from 'common';
import { CanActivateGuard } from 'common/security';
import { MasterLayout, MainLayout } from 'layouts';
import { NoContentRoute } from 'routes';
import { NewBlogPostRoute, EditBlogPostRoute } from 'routes/master';
import { ProfileDetailRoute, BlogSearchResultRoute } from 'routes/master/main';
import { HomeRoute } from 'routes/public';

@NgModule({
    imports: [
        MtCommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: MasterLayout,
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
                    {
                        path: '',
                        component: MainLayout,
                        children: [
                            { path: 'main', component: HomeRoute },
                            { path: 'author/:authorId', component: ProfileDetailRoute },
                            { path: 'blog-search', component: BlogSearchResultRoute }
                        ]
                    },
                    { path: '**', component: NoContentRoute }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MasterRoutingModule { }
