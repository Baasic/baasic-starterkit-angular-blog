import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'baasic-edit-blog-post',
    template: `
        <baasic-blog-post [isNew]="true" (onSave)="backToDetails()" (onCancel)="backToDetails()"></baasic-blog-post>
    `
})
export class EditBlogPostComponent {

    constructor(private router: Router) { }

    /*backToDetails(): void {
        this.router.navigate(['']);
    }*/
}