$(document).ready(function() {
  $('#submit').click(function(event) {
    event.preventDefault();

    let $username = $('#username'), $pwd = $('#password'), $usernameavailable = $('#username-available');
    let username = $username.val(), pwd = $pwd.val();
    $usernameavailable.hide();

    if(username == '') {
      error('Please enter username');
      $username.focus();
      return;
    }
    if(pwd == '') {
      error('Please enter password');
      $pwd.focus();
      return;
    }

    post('/usernameAvailable', {username: username}, function(res) {
      if(res.error) {
        $usernameavailable.show();
        $username.focus();
        return;
      }
      post('/register', {username: username, password: pwd}, function(res) {
        window.location.href = "/home";
      }, function(res) {
        error(res.responseJSON.message);
        $username.focus();
      });
    }, function(err) {
      error(res.responseJSON.message);
      $username.focus();
    });
  });
});