import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";

class TicketCreatedListener extends Listener {

    subject = 'ticket:create';
    queueGroupName = 'payments-service';
    onMessage(data: any, msg: Message): void {
        console.log('Event data', data);

        //imagine business logics here

        msg.ack();
    }
}
export { TicketCreatedListener };