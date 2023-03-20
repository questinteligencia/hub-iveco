import { BaseEventHandler } from './base.handler';
import { SNSEvent } from 'aws-lambda';

/** This class is used to handle AWS Lambdas with source event SNS */
export abstract class BaseSNSHandler extends BaseEventHandler<SNSEvent, void> {

    async handler(event: SNSEvent): Promise<void> {
        await this.initialize();
        console.log(`Received ${event.Records.length} messages`);
        for (const record of event.Records) {
            try {
                console.log({
                    'type': 'message',
                    'content': record.Sns.Message,
                });
                const body = JSON.parse(record.Sns.Message);
                await this.processEvent(body);
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
    }

    abstract processEvent(event: any): Promise<void>;
}
