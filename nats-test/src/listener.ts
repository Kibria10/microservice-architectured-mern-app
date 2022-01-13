import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222',
});

//randomBytes(4).toString('hex') produces random id of stan/clients. that way we can run the listener.ts on multiple terminals.
//if we only had given any particular id instead of randomBytes(4).toString('hex') then we wouldn't be able to do that as nats-server checks of 
//one instance of a particular client id running or not.

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    stan.on('close', () => {
        console.log('NATS connection closed.');
        process.exit();
    });
    const options = stan.subscriptionOptions()
        .setManualAckMode(true); // setting manual acknowledgement mode to true means that 
    //node-nat-streaming server will not be automatically done after sending the event.
    //this is important as our channel might not be able to process the event (db error or traffic load) and the
    //event might need to be sent again. so if the event is not acknowledged inside our
    //channel then the node-nat-streaming server will send it again to a different queue and wait it to be acknowledged.
    const subscription = stan.subscribe(
        'ticket:created', //channel 
        'order-listener-queue-group', //queue group
        options);

    subscription.on('message', (msg) => {
        console.log('Message received');
        const data = msg.getData();
        if (typeof data === 'string') {
            console.log(`Received even #${msg.getSequence()}, with data: ${(data)}`);
        };
        msg.ack(); // this means we have acknowledged the event and the setManualAckMode will get satisfied.
    });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());