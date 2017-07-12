import { Component, EventEmitter, Output } from '@angular/core';
import { BaasicAppService } from 'baasic-sdk-angular';

@Component({
    selector: 'baasic-logout',
    template: `
        <button type="button" class="btn btn--light btn--med rounded" (click)="logout()">Logout</button>
    `
})

export class LogoutComponent {

    @Output('logout') logoutEvent: EventEmitter<void> = new EventEmitter<void>();

    private readonly storageKey: string = 'socialData';

    constructor(private baasicAppService: BaasicAppService) { }

    private clearUser(): void {
        this.baasicAppService.setUser(null);
        this.baasicAppService.updateAccessToken(null);
    }

    private storeSocialLoginData(data: any): void {
        if (!data) {
            localStorage.setItem(this.storageKey, null);
        } else {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        }
    }

    async logout(): Promise<void> {
        let token = this.baasicAppService.getAccessToken();
        if (token) {
            await this.baasicAppService.membershipModule.login.logout(token.token, token.type);

            this.clearUser();
            this.logoutEvent.emit();
        } else {
            this.clearUser();
        }
    }
}