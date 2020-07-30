const conversationService = require('../services/conversationServices');

const socketConnect = function(server) {
    const io = require('socket.io').listen(server);



    io.on('connection',(socket)=>{

        console.log('new connection made.');

        socket.on('join', function(data){
            //joining
            socket.join(data.room);
            console.log(data.user + 'joined the room : ' + data.room);
            socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
        });

        socket.on('leave', function(data){
            console.log(data.user + 'left the room : ' + data.room);
            socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});
            socket.leave(data.room);
        });

        socket.on('message',function(data){
            io.in(data.room).emit('new message', {
                firstName: data.firstName,
                lastName: data.lastName,
                avatarPhoto: data.avatarPhoto,
                message:data.message,
                room: data.room,
                date:new Date()
            });
            conversationService.updateMessagesForSocket({
                _id: data.room,
                messages: {
                    author: data.author,
                    body: data.message,
                    date:new Date()
                }
            });
            io.emit('listenMessages', {room_id: data.room, author: data.author});
        })
    });
};

module.exports = socketConnect;

