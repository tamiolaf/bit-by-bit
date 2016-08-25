#!/usr/bin/env node
var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    console.log(connection);
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
	console.log("Help");
	console.log(message.data);
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    function sendUnconfirmed() {
        if (connection.connected) {
	    connection.sendUTF("{\"op\":\"unconfirmed_sub\"}");
        }
    }
    sendUnconfirmed();
});

client.connect('wss://ws.blockchain.info/inv');
