var chatListUsers = [];
var currentSelectedUser = null;
var conversations = [];

$(document).ready(function() {

  function init() {
    establishSocketConnection(currentUserId);

    getChatList(currentUserId, function(chatListResponse) {
      if (chatListResponse.singleUser) {
        if (chatListUsers.length > 0) {
          chatListUsers = chatListUsers.filter(function (obj) {
            return obj.id !== chatListResponse.chatList[0].id;
          });
        }
        /* Adding new online user into chat list array */
        chatListUsers = chatListUsers.concat(chatListResponse.chatList);
      } else if (chatListResponse.userDisconnected) {
        const loggedOutUser = chatListUsers.findIndex((obj) => obj.id === chatListResponse.userid);
        if (loggedOutUser >= 0) {
          chatListUsers[loggedOutUser].online = 'N';
        }
      } else {
        /* Updating entire chat list if user logs in. */
        chatListUsers = chatListResponse.chatList;
      }
    });
  }


  $('#logout').click(function() {
    logout(currentUserId, function() {
      location.href='/logout';
    });
  });

  init();


});