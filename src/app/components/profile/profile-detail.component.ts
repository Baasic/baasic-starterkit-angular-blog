import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserProfile } from 'baasic-sdk-angular';
import { ProfileService } from 'common/data';
import { LoaderService } from 'common';

@Component({
    selector: 'baasic-profile-detail',
    templateUrl: 'profile-detail.component.html'
})
export class ProfileDetailComponent implements OnInit {

    profile: IUserProfile;

    constructor(
        private route: ActivatedRoute,
        private profileService: ProfileService,
        private loaderService: LoaderService
    ) { }

    async ngOnInit(): Promise<void> {
        this.loaderService.suspend();

        const authorId = this.route.snapshot.params['authorId'];

        this.profile = await this.profileService.get(authorId);

        this.loaderService.resume();
    }
}