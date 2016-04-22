import 'rxjs/Rx';
import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { FugueAuthSignup } from './auth_signup.ts';
import { FugueAuthLogin } from './auth_login.ts';

@Component({
    selector: 'fugue-auth',
    viewProviders: [HTTP_PROVIDERS],
    template: `
<div class="container">
<div class="row">
<div class="col-lg-3">
</div>

<div class="col-lg-6">
<h1>{{title}}</h1>
<router-outlet></router-outlet>
</div>

<div class="col-lg-3">
</div>
</div>
</div>
`,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {
        path: '/signup',
        name: 'Sign Up',
        component: FugueAuthSignup
    },
    // {
    //     path: '/verify',
    //     name: 'Verify',
    //     component: FugueAuthVerify
    // },
    {
        path: '/login',
        name: 'Login',
        component: FugueAuthLogin,
        useAsDefault: true
    }//,
    // {
    //     path: '/forgot-password',
    //     name: 'Forgot Password',
    //     component: FugueAuthForgotPassword
    // }
])
export class FugueAuth  {
}
