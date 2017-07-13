import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'baasic-new-blog-post',
    template: `
        <baasic-blog-post [isNew]="true" (onSave)="blogSaved()" (onCancel)="cancelEdit()"></baasic-blog-post>
    `
})
export class NewBlogPostRoute { 

    constructor(private router: Router) {}

    blogSaved(): void {
        this.router.navigate(['/main']);
    }

    cancelEdit(): void {
        this.router.navigate(['/main']);
    }
}