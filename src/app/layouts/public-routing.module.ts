import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MtCommonModule } from 'common';
import { PublicLayout } from 'layouts';
import { 
    HomeRoute, 
    LoginRoute, 
    SignUpRoute,
    BlogPostDetailsRoute
 } from 'routes/public';

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
                    { path: 'login', component: LoginRoute },
                    { path: 'signup', component: SignUpRoute },
                    { path: 'blog-post/:slug', component: BlogPostDetailsRoute }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class PublicRoutingModule { }