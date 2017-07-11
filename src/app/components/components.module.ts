import { NgModule } from '@angular/core';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MtCommonModule } from 'common';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MtCommonModule
    ],
    declarations: [],
    exports: [],
    providers: [
        //components
        COMPILER_PROVIDERS
    ]
})
export class MtComponentsModule { }
