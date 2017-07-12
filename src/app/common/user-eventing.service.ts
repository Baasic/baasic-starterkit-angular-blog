import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserEventingService {

    logoutEventing$: Subject<void> = new Subject<void>();

    constructor() { }

    notifyLogout(): void {
        this.logoutEventing$.next();
    }
}