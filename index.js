var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var clients = [];
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
	  //console.log('Message from ' + socket.id);
	  //console.log(clients);
	  socket.broadcast.emit('chat message', msg);
	//io.emit('chat message', msg);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
  
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});