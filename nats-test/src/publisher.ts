import nats from 'node-nats-streaming';

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
