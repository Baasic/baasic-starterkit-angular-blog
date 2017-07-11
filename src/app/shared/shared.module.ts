import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TokenService, HttpService } from 'shared';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule
    ],
    providers: [
        TokenService,
        HttpService
    ]
})
export class SharedModule { }