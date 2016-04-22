---
title: Forgot Password
---

<div class="row">
  <div class="col-lg-3">
  </div>
  <div class="col-lg-6">
    <h2 class="center">Lost Password</h2>

    <form>
      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" placeholder="Email">
      </div>

      <button type="submit" id="lost-button" class="btn btn-success">Reset Password</button>
    </form>
  </div>

  <div class="col-lg-3">
  </div>
</div>

<script>
 var info = document.getElementById('info');
 var email = document.getElementById('email');
 var lostButton = document.getElementById('lost-button');
 lostButton.addEventListener('click', function() {
   info.innerHTML = 'Password Lost...';
   if (email.value == null || email.value == '') {
     info.innerHTML = 'Please specify your email address.';
   } else {
     var input = {
       email: email.value
     };
     lambda.invoke({
       FunctionName: 'LambdAuthLostPassword',
       Payload: JSON.stringify(input)
     }, function(err, data) {
       if (err) console.log(err, err.stack);
       else {
         var output = JSON.parse(data.Payload);
         if (output.sent) {
           info.innerHTML = 'Email sent. Please check your email to reset your password.';
         } else {
           info.innerHTML = 'Email <b>not</b> sent.';
         }
       }
     });
   }
 });
</script>
