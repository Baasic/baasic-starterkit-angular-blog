import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MembershipService } from 'baasic-sdk-angular';

@Component({
    selector: 'baasic-social-login',
    templateUrl: 'social-login.component.html'
})

export class SocialLoginComponent implements OnInit {

    // Local storage key.
    private storageKey: string;

    // Activation url used in case of providers which by default through their API don't return an e-mail address in the response. In this instance users must provide their own e-mail address manually and verify the account just like they are registering a new account.
    private activationUrl: string;

    // Url where the SN provider will return us
    private returnUrl: string;

    private notification: string;
    private message: string;

    private providerData: any;
    private model: any;
    private inProgress: boolean;
    private sendingData: boolean;
    private isUserLoggedIn: boolean;
    private showCredentials: boolean;

    form: FormGroup;
    
    constructor(
        private membershipService: MembershipService
    ) { 
        this.createForm();
    }

    ngOnInit(): void {
        this.storageKey = 'socialLogin';
        this.activationUrl = 
        this.returnUrl = 'http://localhost:3000/login';

        this.inProgress = false;
        this.sendingData = false;
        this.providerData = this.getStoredSocialLoginData();

        if (this.providerData && !this.isUserLoggedIn) {
            // If we have data stored in local storage this means that the user has been returned here via callback from the social login provider website so in order to lock the form we're parsing the response data and verifying that the required response codes are present.
            let responseData = this.membershipService.loginSocial.parseResponse(this.providerData.provider, this.returnUrl);
            if (responseData.code || responseData.oAuthToken) {
                this.inProgress = true;
                // Automatically we're also attempting to login
                this.providerData = this.copyObject(this.providerData, responseData);
                this.login();
            } else {
                // The local storage data exists but we have not detected a valid redirect from the social login provider. So we do some garbage cleaning here and clear out the localstorage and indicate that social login is not in progress.
                this.storeSocialLoginData(undefined);
                this.inProgress = false;
            }
        }
    }

    private createForm(): void {
        let form: any = {
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        };

        this.form = new FormGroup(form);
    }

    // Reads stored social login data in local storage
    private getStoredSocialLoginData(): any {
        let data = localStorage.getItem(this.storageKey);
        if (data) {
            return JSON.parse(data);
        }
    }

    // Sets social login data in local storage.
    private storeSocialLoginData(data: any): void {
        if (!data) {
            localStorage.setItem(this.storageKey, null);
        } else {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        }
    }

    async startLogin(provider: string): Promise<void> {
        try {
            let response = (await this.membershipService.loginSocial.get(provider, this.returnUrl));
            response.data.provider = provider;
            response.data.activatonUrl = this.activationUrl;
            this.storeSocialLoginData(response);
            window.location.href = response.data.redirectUri;
        } catch(exception) {
            let text = 'An error has occurred while fetching social login parameters.';
            if (exception.data.error) {
                text = exception.status + ': ' + exception.data.error_description;
            }
            this.notification = text;
        }
    }

    async login(): Promise<void> {
        let formData = this.form.getRawValue();
        this.model.email = formData.username;
        this.model.password = formData.password;
        
        let data = this.copyObject({}, this.providerData);
        if (this.model.email) {
            data.email = this.model.email;
        }
        if (this.model.password) {
            data.password = this.model.password;
        }
        if (this.sendingData) {
            return;
        }
        this.sendingData = true;

        try {
            let response = await this.membershipService.loginSocial.post(data.provider, data);
            this.isUserLoggedIn = true;
            this.message = 'Successful login';
            this.inProgress = false;
            this.showCredentials = false;
            this.notification = 'Logged in, please wait.';

            
            try {
                let data = await this.membershipService.login.loadUserData(null);
            } catch(exception) {
                let text = 'Please verify account with link that we sent to your email.';
                if (exception.data.error) {
                    text = exception.status + ': ' + exception.data.error_description;
                }
                this.notification = text;
            }
        } catch(exception) {
            let text = 'Could not login user into the system';
            if (exception.data.error) {
                text = exception.status + ': ' + data.error_message;
                if (data.error === 'invalid_grant' || data.error === 'missing_email') {
                    // Existing user detected in the system, possibly data provided without the user password as well so prompt the user to provide the email and password
                    this.showCredentials = true;
                    text = 'Please enter your data to proceed';
                }
            }
            this.notification = text;
        } finally {
            this.sendingData = false;
            this.storeSocialLoginData(null);
        }
    }

    cancel(): void {
         // Cancel social login mode and clear provider data
        this.notification = '';
        this.showCredentials = false;
        this.inProgress = false;
        this.providerData = undefined;
        this.storeSocialLoginData(null);
    }

    private copyObject(dstObj: any, ...srcObj: any[]): any {
        const newObj = dstObj;
        for (const obj of srcObj) {
            for (const key in obj) {
                //copy all the fields
                newObj[key] = obj[key];
            }
        }
        return newObj;
    }
}