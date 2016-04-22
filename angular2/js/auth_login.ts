import {View, Component} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import { RouterLink } from 'angular2/router';

import {AuthPayload} from './auth_payload.ts'

@Component({
    selector: 'fugue-auth-login',
    viewProviders: [HTTP_PROVIDERS],
    directives: [RouterLink],
    template: `
<h2 class="center">Login</h2>

<form>
<div class="form-group">
<label for="email">Email address</label>
<input type="email" class="form-control" id="email" placeholder="Email"[(ngModel)]="auth.Email">
</div>
<div class="form-group">
<label for="password">Password</label>
<input type="password" class="form-control" id="password" placeholder="Password"[(ngModel)]="auth.Password">
</div>

<button (click)="login()" type="submit" id="login-button" class="btn btn-success">Login</button> /
<a [routerLink]="['Sign Up']">Sign Up</a> /
</form>

{{auth.info}}
`
})
export class FugueAuthLogin {
    auth = new AuthPayload('', '', '');

// <a [routerLink]="['Forgot Password']">Forgot Password?</a>
    login() {
        if(this.auth.verifyLogin()) {
            this.auth.login();
        }

    }
}
