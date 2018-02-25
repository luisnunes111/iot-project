module.exports = {};

const http_server = require('./server');
const io = http_server.socket_io;
const udp_server = require('./udp-server');

io.on('connection', socket => {
    console.log('Socket IO: User connected')

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('update_commands', (data) => {
        udp_server.updateCommands(data.boardId, data.commands) 
        console.log("update_commands")
    });

    socket.on('room', (data) => {
        console.log(data)
        socket.join(data.room);
        console.log("user joined room!")
    });

    socket.on('leave room', (data) => {
        socket.leave(data.room)
        console.log("user leaved room!")
    })

})

const sendSensorInfo = (msg, boardId) => {
    try {
        io.sockets.to(boardId).emit("received read", msg);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
};

module.exports.broadcastRead = sendSensorInfo;
