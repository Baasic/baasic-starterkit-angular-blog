import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MtCommonModule } from 'common';
import { MainLayout } from 'layouts';
import { 
    BlogPostDetailsRoute,
    HomeRoute, 
    LoginRoute,
    RegisterRoute, 
    SignUpRoute
 } from 'routes/main';

@NgModule({
    imports: [
        MtCommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: MainLayout,
                children: [
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
export class MainRoutingModule { }