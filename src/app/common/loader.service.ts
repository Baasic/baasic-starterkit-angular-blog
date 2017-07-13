import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

@Injectable()
export class LoaderService {
    public loading: Observable<any>;
    private observer: Observer<boolean>;

    constructor() {
        this.loading = new Observable(
        observer => this.observer = observer).share();
    }

    suspend(): void {
        if (this.observer) {
            this.observer.next(true);
        }
    }

    resume(): void {
        if (this.observer) {
            this.observer.next(false);
        }
    }
}