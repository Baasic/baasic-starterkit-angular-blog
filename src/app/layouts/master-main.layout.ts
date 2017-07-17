import { Component } from '@angular/core';

@Component({
    selector: 'master-main-layout',
    templateUrl: 'master-main.layout.html'
})
export class MasterMainLayout { 

    messageClosed: boolean = false;

    toggleMessage(): void {
        this.messageClosed = !this.messageClosed;
    }
}
