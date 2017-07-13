import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import{ IUserProfile } from 'baasic-sdk-angular';
import { ProfileService } from 'common/data';

@Component({
    selector: 'baasic-profile',
    template: `
        <hr />
        <div>
            <h3><a href="javascript:void(0)" [routerLink]="['/author', authorId]" class="author__title--secondary">{{ profile?.displayName }}</a></h3>
            <p class="spc--top--tny author__content">{{ profile?.aboutMySelf }}</p>
        </div>
    `
})
export class ProfileComponent implements OnInit, OnChanges {

    @Input('authorId') authorId: string;

    profile: IUserProfile;

    constructor(private profileService: ProfileService) { }

    async ngOnInit(): Promise<void> { 
        if (this.authorId) {
            this.profile = await this.profileService.get(this.authorId);
        }
    }

    async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (changes.authorId) {
            this.profile = await this.profileService.get(this.authorId);
        }
    }
}