import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
    selector: 'baasic-blog-post',
    templateUrl: 'new-blog-post.route.html'
})

export class NewBlogPostRoute implements OnInit {

    private readonly isNew: boolean = true;
    private viewMode: string = 'markdown';

    form: FormGroup;

    content: string = '';

    constructor() { 
        this.createForm();
        console.log(this.form);
    }

    ngOnInit(): void  {
        this.detectContentChange();
     }

    private createForm(): void {
        let form: any = {
            title: new FormControl(null, Validators.required),
            featured: new FormControl(null, Validators.required),
            excerpt: new FormControl(null),
            content: new FormControl(null, Validators.required),
            allowComments: new FormControl(null),
            hideComments: new FormControl(null),
        };

        this.form = new FormGroup(form);
    }

    private readingTime(text: string): any {
        let words = 0, start = 0, end = text.length - 1, i;

        // fetch bounds
        while (this.whitespace(text[start])) {
            start++;
        }
        while (this.whitespace(text[end])) {
            end--;
        }

        // there no words if bounds are equal
        if (start === end) {
            return null;
        }

        // calculates the number of words
        for (i = start; i <= end;) {
            for (; i <= end && !this.whitespace(text[i]) ; i++) {
                words++;
            }
            for (; i <= end && this.whitespace(text[i]) ; i++) {
            }
        }

        // reading time stats
        let minutes = words / 200;
        let time = minutes * 60 * 1000;
        let displayed = Math.ceil(minutes);

         return {
            text: displayed + ' min read',
            time: time,
            words: words
        };
    }

    private whitespace(character: String): boolean {
        return (
            (' ' === character) ||
            ('\n' === character) ||
            ('\t' === character)
        );
    }

    private detectContentChange(): void {
        this.form.controls["content"].valueChanges.subscribe((content: string) => {
            this.content = content;
        });
    }

    setViewMode(mode: string): void {
        this.viewMode = mode;
    }
}