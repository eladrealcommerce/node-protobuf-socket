var ProtoBuf = require("protobufjs");
var ByteBuffer = ProtoBuf.ByteBuffer;
var builder = ProtoBuf.loadProtoFile("sample.proto");

var person = builder.build('sample.Person');
var sample = builder.build('sample.Sample');
var messageToSend = new sample({id: 150});
var messageToSend = new person({
  name: 'Lorde',
  id: 2,
  email: 'lorde@royals.com'
});

var net = require('net');

var socket = net.Socket();

socket.connect(8124, 'localhost');

socket.on('data', function(bytes) {
  console.log(bytes, "--Data received from server.")
});

var buffer = messageToSend.encode().toBuffer();
console.log(buffer);
socket.write(buffer);
