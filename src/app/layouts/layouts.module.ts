import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import { MtCommonModule } from 'common';
import { MainLayout, MainRoutingModule, PublicLayout, PublicRoutingModule } from 'layouts';
import { MtRoutesModule } from 'routes';
import { MtComponentsModule } from 'components';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        PublicRoutingModule,
        MainRoutingModule,
        MtCommonModule,
        MtRoutesModule,
        MtComponentsModule
    ],
    declarations: [
        PublicLayout,
        MainLayout
    ]
})
export class MtLayoutsModule {
}
