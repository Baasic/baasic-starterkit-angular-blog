import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BaasicAppService } from 'baasic-sdk-angular';

@Injectable()
export class CanActivateGuard implements CanActivate {

    constructor(
        private baasicAppService: BaasicAppService,
        private readonly router: Router
    ) { }

    async canActivate(): Promise<boolean> {
        let token = await this.baasicAppService.getAccessToken();
        if (token) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}