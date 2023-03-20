import { KeyableObject } from '../helpers/types';
import { SNS } from 'aws-sdk';
import { serialize } from 'class-transformer';
import { injectable } from 'inversify';

@injectable()
export class SNSPublisher {

    constructor() {
    }

    private _snsClient: SNS;

    get snsClient() {
        if (!this._snsClient) {
            const snsClientConfig = {
                region: process.env.AWS_SNS_REGION,
            };
            this._snsClient = new SNS(snsClientConfig);
        }
        return this._snsClient;
    }

    set snsClient(sqsClient: any) {
        this._snsClient = sqsClient;
    }

    async sendMessage(body: KeyableObject): Promise<any> {
        const messageCommand = this.getMessageCommand(body);
        return this.snsClient.publish(messageCommand).promise();
    }

    private getMessageCommand(body: KeyableObject): any {
        return {
            Message: JSON.stringify(body),
            TopicArn: process.env.AWS_SNS_QUEUE
        };
    }
}
