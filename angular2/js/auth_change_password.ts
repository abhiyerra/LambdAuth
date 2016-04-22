---
title: Change Password
---

<div class="row">
  <div class="col-lg-3">
  </div>
  <div class="col-lg-6">
    <h2 class="center">Change Password</h2>

    <form>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" placeholder="Email">
      </div>

      <div class="form-group">
        <label for="old-password">Current Password</label>
        <input type="password" class="form-control" id="old-password" placeholder="Current Password">
      </div>

      <div class="form-group">
        <label for="new-password">New Password</label>
        <input type="password" class="form-control" id="new-password" placeholder="New Password">
      </div>

      <div class="form-group">
        <label for="verify-new-password">Verify New Password</label>
        <input type="password" class="form-control" id="verify-new-password" placeholder="Verify New Password">
      </div>

      <button type="submit" id="change-button" class="btn btn-success">Change Password</button>
    </form>
  </div>

  <div class="col-lg-3">
  </div>
</div>

<script>
 var info = document.getElementById('info');
 var email = document.getElementById('email');
 var oldPassword = document.getElementById('old-password');
 var newPassword = document.getElementById('new-password');
 var verifyNewPassword = document.getElementById('verify-new-password');
 var changeButton = document.getElementById('change-button');
 changeButton.addEventListener('click', function() {
   info.innerHTML = 'Change Password...';
   if (email.value == null || email.value == '') {
     info.innerHTML = 'Please specify your email address.';
   } else if (oldPassword.value == null || oldPassword.value == '') {
     info.innerHTML = 'Please specify your current password.';
   } else if (newPassword.value == null || newPassword.value == '') {
     info.innerHTML = 'Please specify a new password.';
   } else if (newPassword.value != verifyNewPassword.value) {
     info.innerHTML = 'The new passwords are <b>different</b>, please check.';
   } else {
     var input = {
       email: email.value,
       password: oldPassword.value
     };
     lambda.invoke({
       FunctionName: 'LambdAuthLogin',
       Payload: JSON.stringify(input)
     }, function(err, data) {
       if (err) console.log(err, err.stack);
       else {
         var output = JSON.parse(data.Payload);
         console.log('identityId: ' + output.identityId);
         console.log('token: ' + output.token);
         if (!output.login) {
           info.innerHTML = '<b>Not</b> logged in';
         } else {
           info.innerHTML = 'Logged in with identityId: ' + output.identityId + '<br>';
           var creds = AWS.config.credentials;
           creds.params.IdentityId = output.identityId;
           creds.params.Logins = {
             'cognito-identity.amazonaws.com': output.token
           };
           creds.expired = true;
           var input = {
             email: email.value,
             oldPassword: oldPassword.value,
             newPassword: newPassword.value
           };
           AWS.config.credentials.get(function(err) {
             if (err) console.log(err, err.stack);
             else {
               lambda.invoke({
                 FunctionName: 'LambdAuthChangePassword',
                 Payload: JSON.stringify(input)
               }, function(err, data) {
                 if (err) console.log(err, err.stack);
                 else {
                   var output = JSON.parse(data.Payload);
                   if (!output.changed) {
                     info.innerHTML = 'Password <b>not</b> changed.';
                   } else {
                     info.innerHTML = 'Password changed.';
                   }
                 }
               });
             }
           });
         }
       }
     });
   }
 });
</script>
