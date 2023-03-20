import 'reflect-metadata';
import {BaseScheduleEventHandler} from "../../core/handlers/base-schedule-event";
import {ScheduledEvent} from "aws-lambda";
import {injector} from "../../shared/injection/injector";
import {TYPES} from "../../shared/injection/types";
import {SQSClient} from "../../shared/sqs/sqs-client";

/** This class read messages from queue and send to another */
class MonitoringDeadQueueHandler extends BaseScheduleEventHandler {

    private readonly SQS_EVENT = 'dead-queue:reprocess';

    /** Read messages from queue */
    async processEvent(): Promise<void> {

        const sqsClient: SQSClient = injector.get(TYPES.SQSClient);

        const result = await sqsClient.receiveMessages();
        const messages = result.Messages || [];
        console.log(`Received ${messages.length} messages`);
        for (const message of messages) {
            console.log(`Processing message ${message.MessageId}`);

            await sqsClient.sendMessage(this.SQS_EVENT, JSON.parse(message.Body));
            await sqsClient.deleteMessage(message.ReceiptHandle);

            console.log(`Processed message ${message.MessageId}`)
        }
    }
}

/** This function starts the process of monitoring queue */
export const scheduledEventHandler = async (event: ScheduledEvent): Promise<void> => {
    const monitoringDeadQueueHandler: MonitoringDeadQueueHandler = new MonitoringDeadQueueHandler();
    return monitoringDeadQueueHandler.handler(event);
};


