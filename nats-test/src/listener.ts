import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    });

    new TicketCreatedListener(stan).listen();
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