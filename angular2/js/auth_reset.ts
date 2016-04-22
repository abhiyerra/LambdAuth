---
title: Reset Password
---

<div class="row">
  <div class="col-lg-3">
  </div>
  <div class="col-lg-6">
    <h2 class="center">Password Reset</h2>

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
        <label for="verifyPassword">Verify Password</label>
        <input type="password" class="form-control" id="verifyPassword" placeholder="Verify New Password">
      </div>

      <button type="submit" id="reset-password-button" class="btn btn-success">Change Password</button>
    </form>
  </div>

  <div class="col-lg-3">
  </div>
</div>

<script>

 function getUrlParams() {
   var p = {};
   var match,
       pl     = /\+/g,  // Regex for replacing addition symbol with a space
       search = /([^&=]+)=?([^&]*)/g,
       decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
       query  = window.location.search.substring(1);

   while (match = search.exec(query))
     p[decode(match[1])] = decode(match[2]);
   return p;
 }
 var resetPasswordButton = document.getElementById('reset-password-button');
 var password = document.getElementById('password');
 var verifyPassword = document.getElementById('verifyPassword');
 var info = document.getElementById('info');
 var urlParams = getUrlParams();
 var email = urlParams['email'] || null;
 var lost = urlParams['lost'] || null;
 if (email) {
   info.innerHTML = 'Type your new password for user ' + email;
 }
 resetPasswordButton.addEventListener('click', function() {
   if (password.value == null || password.value == '') {
     info.innerHTML = 'Please specify a password.';
   } else if (password.value != verifyPassword.value) {
     info.innerHTML = 'Passwords are <b>not</b> the same, please check.';
   } else {
     if ((!email)||(!lost)) {
       info.innerHTML = 'Please specify email and lost token in the URL.';
     } else {
       info.innerHTML = 'Trying to reset password for user ' + email + ' ...';
       var input = {
         email: email,
         lost: lost,
         password: password.value
       };
       lambda.invoke({
         FunctionName: 'LambdAuthResetPassword',
         Payload: JSON.stringify(input)
       }, function(err, data) {
         if (err) console.log(err, err.stack);
         else {
           var output = JSON.parse(data.Payload);
           if (output.changed) {
             info.innerHTML = 'Password changed for user ' + email;
           } else {
             info.innerHTML = 'Password <b>not</b> changed.';
           }
         }
       });
     }
   }
 });
</script>
