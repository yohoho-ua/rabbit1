
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'task_queue';
    // var msg = process.argv.slice(2).join(' ') || "Hello World!";
    var msg = {
      title: 'Alert',
      app: 'some CRM app',
      destintion: 'User',
      type: "text",
      content: "bla bla bla"
   }
  //  console.log(JSON.stringify(msg));
    ch.assertQueue(q, {durable: true});
    ch.sendToQueue(q, new Buffer(JSON.stringify(msg)), {persistent: true});
    console.log(" [x] Sent '%s'", msg.title);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});