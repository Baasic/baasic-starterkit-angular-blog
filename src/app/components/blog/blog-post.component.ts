import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MembershipService } from 'baasic-sdk-angular';
import { BlogService } from 'common/data';

@Component({
    selector: 'baasic-blog-post',
    templateUrl: 'blog-post.component.html'
})
export class BlogPostComponent implements OnInit {
    @Input('isNew') isNew: boolean = true;
    @Output('onSave') saveEvent: EventEmitter<void> = new EventEmitter<void>();
    @Output('onCancel') cancelEvent: EventEmitter<void> = new EventEmitter<void>();

    private viewMode: string = 'markdown';
    private error: string;

    form: FormGroup;

    content: string = '';

    constructor(
        private membershipService: MembershipService,
        private blogService: BlogService
    ) { 
        this.createForm();
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

    async saveBlog(): Promise<void> {
        let blog = this.form.getRawValue();

        if (blog) {
            blog.readingTime = this.readingTime(blog.content);
            let user = this.membershipService.login.loadUserData({});
            blog.authorName = user.displayName;

            try {
                if (this.isNew) {
                    blog.status = this.blogService.blogStatus.published;
                    await this.blogService.create(blog);
                    this.saveEvent.emit();
                } else {
                    await this.blogService.update(blog);
                }
            } catch(exception) {
                this.error = exception.data.message;
            }
        }
    }

    cancelEdit(): void {
        this.cancelEvent.emit();
    }
}