import { Injectable } from '@angular/core';
import { IOptions, IUserProfile, UserProfileService } from 'baasic-sdk-angular';

@Injectable()
export class ProfileService {

    constructor(private userProfileService: UserProfileService) { }

    async get(id: string, options?: IOptions): Promise<IUserProfile> {
        return (await this.userProfileService.profile.get(id, options)).data;
    } 
}