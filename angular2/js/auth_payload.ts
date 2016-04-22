import {CookieMonster} from '/fugue/common/js/cookie_monster.ts'
import {BridgeRequest} from '/fugue/common/js/bridge_request.ts'


export class AuthPayload {
    FUNCTION_NAME: string =  'fugue_auth_users';

    constructor(
        public Email: string,
        public Password: string,
        public VerifyPassword: string
        public info?: string
    ) {}

    staged(fnName: string): string {
        if document.location.host.match("/www.acksin.com/") {
            return fnName + '-prod';
        }

        return fnName + '-dev';
    }

    verifySignup():bool {
        this.info = 'Sign Up...';

        if (this.Email == null || this.Email == '') {
            this.info = 'Please specify your email address.';
            return false;
        } else if (this.Password == null || this.Password == '') {
            this.info = 'Please specify a password.';
            return false;
        } else if (this.Password != this.VerifyPassword) {
            this.info = 'Passwords are <b>different</b>, please check.';
            return false
        }

        return true;
    }

    signup() {
        var that = this;
        var lambda = new AWS.Lambda();

        lambda.invoke({
            FunctionName: staged(this.FUNCTION_NAME),
            Payload: JSON.stringify(this)
        }, function(err, data) {
            console.log(data)
            if (err) {
                console.log(err, err.stack);
            } else {
                var output = JSON.parse(data.Payload);
                if (output.created) {
                    that.info = 'User ' + that.Email + ' created. Please check your email to validate the user and enable login.';
                } else {
                    that.info = 'User <b>not</b> created.';
                }
            }
        });
    }

    verifyLogin():bool {
        this.info = 'Login...';

        if (this.Email == null || this.Email == '') {
            this.info = 'Please specify your email address.';
            return false;
        } else if (this.Password == null || this.Password == '') {
            this.info = 'Please specify a password.';
            return false;
        }

        return true;
    }

    login() {
        var that = this;
        var lambda = new AWS.Lambda();

        lambda.invoke({
            FunctionName: this.staged(this.FUNCTION_NAME),
            Payload: JSON.stringify(this.request("Login", {
                Email: this.Email,
                Password: this.Password
            }))
        }, function(err, data) {
            if (err) {
                console.log(err, err.stack);
            } else {
                var output = JSON.parse(data.Payload);

                if (output.Error != "") {
                    that.info = 'Invalid Credentials.';
                } else {
                    CookieMonster.create("FugueSessionID", output.Payload.SessionID);
                    window.location.href = "/fugue/console";
                }
            }
        });
    }

    private request(action: string, payload: any): BridgeRequest {
        return new BridgeRequest("fugue.auth.users", action, "POST", false, payload)
    }
}
