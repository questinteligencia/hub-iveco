import { BaseEventHandler } from './base.handler';
import { SQSEvent } from 'aws-lambda/trigger/sqs';
import { removeInvalidStrings } from '../../shared/helpers/functions';

/** This class is used to handle AWS Lambdas with source event SQS */
export abstract class BaseSQSHandler extends BaseEventHandler<SQSEvent, void> {

    async handler(event: SQSEvent): Promise<void> {
        await this.initialize();

        console.log(`Received ${event.Records.length} messages`);
        for (const record of event.Records) {
            try {
                console.log({
                    'type': 'message',
                    'content': record.body,
                });
                const body = JSON.parse(record.body);
                const parsedObject = removeInvalidStrings(body);
                await this.processEvent(parsedObject);
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
    }

    abstract processEvent(event: any): Promise<void>;
}
