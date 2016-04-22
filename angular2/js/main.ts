import {bootstrap}  from 'angular2/platform/browser';
import {FugueAuth} from './fugue_auth.ts';

import {ROUTER_PROVIDERS} from 'angular2/router';
import {provide}           from 'angular2/core';
import {LocationStrategy, HashLocationStrategy} from 'angular2/router';

bootstrap(FugueAuth, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
