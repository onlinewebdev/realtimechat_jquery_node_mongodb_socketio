function error(msg) {
  alert(msg);
}

function post(url, data, callback, error) {
  $.ajax({
    url: url,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: callback,
    error: error
  });
}