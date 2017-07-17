import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MtCommonModule } from 'common';
import { PublicLayout } from 'layouts';
import { 
    BlogPostDetailsRoute,
    HomeRoute, 
    LoginRoute,
    RegisterRoute, 
    SignUpRoute
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
                    { path: 'register', component: RegisterRoute },
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