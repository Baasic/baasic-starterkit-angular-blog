import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import { MtCommonModule } from 'common';
import { MainLayout, MainRoutingModule, MasterMainLayout, MasterLayout, MasterRoutingModule } from 'layouts';
import { MtRoutesModule } from 'routes';
import { MtComponentsModule } from 'components';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MainRoutingModule,
        MasterRoutingModule,
        MtCommonModule,
        MtRoutesModule,
        MtComponentsModule
    ],
    declarations: [
        MainLayout,
        MasterMainLayout,
        MasterLayout
    ]
})
export class MtLayoutsModule {
}
