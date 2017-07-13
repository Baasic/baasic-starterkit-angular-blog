import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import { MtCommonModule } from 'common';
import { MainLayout, MainRoutingModule, MasterLayout, MasterRoutingModule, PublicLayout, PublicRoutingModule } from 'layouts';
import { MtRoutesModule } from 'routes';
import { MtComponentsModule } from 'components';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        PublicRoutingModule,
        MasterRoutingModule,
        MtCommonModule,
        MtRoutesModule,
        MtComponentsModule
    ],
    declarations: [
        PublicLayout,
        MainLayout,
        MasterLayout
    ]
})
export class MtLayoutsModule {
}
