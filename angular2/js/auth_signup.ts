import {Component} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

import { RouterLink } from 'angular2/router';

import {AuthPayload} from './auth_payload.ts';


@Component({
    selector: 'fugue-auth-signup',
    viewProviders: [HTTP_PROVIDERS],
    directives: [RouterLink],
    template: `
<h2 class="center">Sign Up</h2>

<form>
<div class="form-group">
<label for="email">Email address</label>
<input type="email" class="form-control" id="email" placeholder="Email" [(ngModel)]="auth.Email">
</div>

<div class="form-group">
<label for="password">Password</label>
<input type="password" class="form-control" id="password" placeholder="Password" [(ngModel)]="auth.Password">
</div>

<div class="form-group">
<label for="verifyPassword">Verify Password</label>
<input type="password" class="form-control" id="verifyPassword" placeholder="Verify Password" [(ngModel)]="auth.VerifyPassword">
</div>

<button id="signup-button" class="btn btn-success" (click)="signup()">Submit</button> /
<a [routerLink]="['Login']">Login</a>

<p>{{auth.info}}</p>
</form>
`
})
export class FugueAuthSignup {
    auth = new AuthPayload('', '', '');

    signup() {
        if(this.auth.verifySignup()) {
            this.auth.signup();
        }
    }
}
