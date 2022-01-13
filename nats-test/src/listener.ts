import nats, { Message, Stan } from 'node-nats-streaming';

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


abstract class Listener {
    private client: Stan;
    abstract queueGroupName: string;
    abstract subject: string;
    protected ackWait = 5 * 1000;
    abstract onMessage(data: any, msg: Message): void;
    constructor(client: Stan) {
        this.client = client;
    };

    subscriptionOptions() {
        return this.client.subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    }

    listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        );

        subscription.on('message', (msg: Message) => {
            console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);
            const parseData = this.parseMessage(msg);
            this.onMessage(parseData, msg);
        });
    }
    parseMessage(msg: Message) {
        const data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf8')); //to handle buffer
    }
}

class TicketCreatedListener extends Listener {

    subject = 'ticket:create';
    queueGroupName = 'payments-service';
    onMessage(data: any, msg: nats.Message): void {
        console.log('Event data', data);

        //imagine business logics here

        msg.ack();
    }

}