$(document).ready(function() {
  function init() {
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

      renderChatList();
    });

    receiveMessage(function(socketResponse) {
      if (currentSelectedUser !== null && currentSelectedUser.id === socketResponse.fromUserId) {
        conversations.push(socketResponse);
        renderConversation();
      }
    });
  }

  function getMessages() {
    post('/getMessages', {userId: 'tettest', toUserId: currentSelectedUser.id}, function(messageResponse) {
      conversations = messageResponse.messages;
      renderConversation();
    });
  }

  function renderConversation() {
    let $messagethread = $('.message-thread');
    $messagethread.html('');
    conversations.forEach(function(conversation) {
      $messagethread.append('<li class="' + (conversation.fromUserId == currentUserId ? 'align-right' : '') + '">' + conversation.message + '</li>');
    });
    scrollMessageContainer();
  }

  function renderChatList() {
    var $userlist = $('.user-list'), $listavailable = $('.chat-list-container .alert');

    if(chatListUsers.length == 0) {
      $userlist.hide(); $listavailable.show();
    }
    else {
      $userlist.show(); $listavailable.hide();

      $userlist.html('');

      chatListUsers.forEach(function(user) {
        let $li = $('<li class="' + (currentSelectedUser != null && user.id == currentSelectedUser.id ? 'active' : '') + '" data-user-id="' + user.id + '" data-username="' + user.username + '">' + user.username + '<span class="' + (user.online == 'Y' ? 'online' : 'offline') + '"></span></li>');
        $userlist.append($li);
        $li.click(function() {
          selectedUser(user);
        });
      });
    }
  }

  function selectedUser(user) {
    currentSelectedUser = user;
    $('.user-list li').removeClass('active');
    $('.user-list li[data-user-id=' + user.id + ']').addClass('active');

    $('.message-overlay').hide();
    $('.message-wrapper').show();
    $('.opposite-user').html('Chatting with ' + user.username);

  
    getMessages();
  }

  function scrollMessageContainer() {
    setTimeout(function(){
      let $message = $('.message-thread');

      $message.scrollTop($message[0].scrollHeight);
    }, 100);
    
  }

  $('.message').keyup(function(e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {  // Enter keycode
      e.preventDefault();

      let message = $(this).val();
      $(this).val('');

      let data = {
        fromUserId: currentUserId,
        message: (message).trim(),
        toUserId: currentSelectedUser.id,
      };
      sendMessage(data);

      conversations = conversations.concat([data]);
      renderConversation();
    }
  });

  init();
});