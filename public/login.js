$(document).ready(function() {
  $('#submit').click(function(event) {
    event.preventDefault();

    let $username = $('#username'), $pwd = $('#password');
    let username = $username.val(), pwd = $pwd.val();
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

    post('/login', {username: username, password: pwd}, function(res) {
      window.location.href = "/home";
    }, function(res) {
      error(res.responseJSON.message);
      $username.focus();
    });
  });
});