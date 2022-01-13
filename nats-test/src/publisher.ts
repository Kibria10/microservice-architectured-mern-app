import nats, { Message, Stan } from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222',
});
//abc is a client for this publishe.ts file
stan.on('connect', () => {
    console.log('Publisher connected to NATS');

    const data = JSON.stringify({
        id: '123',
        title: 'concert',
        price: 20,
    });
    //ticket:created is a channel on which we are publishing our data
    stan.publish('ticket:created', data, () => {
        console.log('Event published');
    });
});



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
