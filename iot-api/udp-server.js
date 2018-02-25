module.exports = {};

const dgram = require('dgram');
const udp_server = dgram.createSocket('udp4');
const socket_api = require('./socket-api');
const board = require('./lib/routes/board')

const boardsMap= {} 
const PORT = 3002;

//when socket is ready and listening for datagram msgs
udp_server.on('listening', function () {
    var address = udp_server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

//on new datagram msg
udp_server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port + ' - ' + message);

    var read = (message+"").split('&');

    //save to DB
    board.insert_read({ temperature: read[1], humidity: read[2], luminosity: read[3], led_state: read[4], battery: read[5]}, read[0])

    //send to frontend
    socket_api.broadcastRead({ date: Date.now(), temperature: read[1], humidity: read[2], luminosity: read[3], led_state: read[4], battery: read[5]}, read[0]);

    boardsMap[read[0]] = { address:remote.address, port: remote.port };//guardar o ip e o port para depois enviar
    // console.log(bufferedData);
    // if(bufferedData){      
    //     //reply to client
    //     udp_server.send(bufferedData, remote.port,remote.address, function(error){
    //         if(error){
    //             console.log('Error sending.');
    //         }else{
    //             //boardsMap[read[0]] = null; //remove os dados que estavam no buffer
    //             console.log('Data replied.');

    //         }
    //     });
    // }
    
});

const updateCommands = (boardId, commands) => {
   if(boardsMap[boardId]){
        udp_server.send(commands, boardsMap[boardId].port, boardsMap[boardId].address, function(error){
            if(error){
                console.log('Error sending.');
            }else{
                //boardsMap[read[0]] = null; //remove os dados que estavam no buffer
                console.log('Data replied.');

            }
        });
   } else{
    console.log('Error sending.2');
   }  
};

module.exports.updateCommands = updateCommands;
module.exports.start = function(env) {
    //udp_server.bind(PORT, 'aaaa::1');
    udp_server.bind(PORT, '127.0.0.1');
};


