import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from 'common';

@Component({
    selector: 'loader-component',
    templateUrl: 'loader.component.html'
})
export class LoaderComponent implements OnInit, OnDestroy {

    public loading: boolean = false;

    private loaderSubscription: Subscription;

    constructor(private loaderService: LoaderService) { }

    ngOnInit(): void {
        this.loaderSubscription = this.loaderService.loading.subscribe((loading: boolean) => this.loading = loading );
    }

    ngOnDestroy(): void {
        this.loaderSubscription.unsubscribe();
    }
}