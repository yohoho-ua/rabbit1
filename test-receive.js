var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'task_queue';

    ch.assertQueue(q, {durable: true});
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      msgData = JSON.parse(msg.content)
      console.log(" [x] Received %s", msg.content.toString());
      console.log(" [x] Received %s", msgData.title);
      console.log(" [x] Done");
      ch.ack(msg);
    }, {noAck: false});
  });
});