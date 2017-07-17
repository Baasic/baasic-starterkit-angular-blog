import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MembershipService } from 'baasic-sdk-angular';

@Component({
    selector: 'baasic-registration',
    templateUrl: 'register.component.html'
})
export class RegisterComponent {
    
    form: FormGroup;

    message: string;

    constructor(private membershipService: MembershipService) { 
        this.createForm();
    }

    private createForm(): void {
        let form = {
            email: new FormControl(null, Validators.required),
            userName: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
            confirmPassword: new FormControl(null, Validators.required)
        };

        this.form = new FormGroup(form);
    }

    async register(): Promise<void> {
        let user = this.form.getRawValue();

        user.creationDate = new Date();

        // recaptcha is missing
        user.challengeIdentifier = '';
        user.challengeResponse = '';

        /*
            if (user.challengeResponse === '') {
                this.message = 'Captcha code is required!';
                return;
            }
        */

        try {
            await this.membershipService.register.create(user);
            this.message = 'You have successfully registered, please check your email in order to finish registration process';
        } catch(err) {
            this.message = err.statusCode + ': ' + err.data.message;
        }
    }
}