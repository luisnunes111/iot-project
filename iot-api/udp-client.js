const dgram = require('dgram'),
    udp_client = dgram.createSocket('udp4');

const PORT = 3002;


//when socket is ready and listening for datagram msgs
udp_client.on('listening', function () {
    var address = udp_client.address();
    console.log('UDP client listening on ' + address.address + ":" + address.port);
});

module.exports = {
    'start': function(env) {
        setInterval(function(){ 
            var message = "11&25.4"
            udp_client.send(message, PORT,'127.0.0.1', function(error){
                if(error){
                    console.log('Error sending.');
                }else{
                    console.log('Data sent.');
                }
            });
        }, 10000); 
    }
};