var net = require('net');
var ProtoBuf = require("protobufjs");
var ByteBuffer = ProtoBuf.ByteBuffer;
var builder = ProtoBuf.loadProtoFile("sample.proto");

var person = builder.build('sample.Person');

var server = net.createServer( function(c) {
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  // c.write('hello\r\n');
  c.on('data', function(data) {
      console.log(person.decode(data));
  });

  c.pipe(c);
});

server.listen(8124, function() { //'listening' listener
  console.log('server bound');
});
