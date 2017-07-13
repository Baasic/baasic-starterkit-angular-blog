import { Component } from '@angular/core';

@Component({
    selector: 'main-layout',
    templateUrl: 'main.layout.html'
})
export class MainLayout { 

    messageClosed: boolean = false;

    toggleMessage(): void {
        this.messageClosed = !this.messageClosed;
    }
}
