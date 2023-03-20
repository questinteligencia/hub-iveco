import { KeyableObject } from '../helpers/types';
import { SQS } from 'aws-sdk';
import { injectable } from 'inversify';

@injectable()
export class SQSClient {

    constructor() {
    }

    private _sqsClient: SQS;

    get sqsClient() {
        if (!this._sqsClient) {
            const sqsClientConfig = {
                endpoint: process.env.AWS_SQS_ENDPOINT,
                region: process.env.AWS_SQS_REGION,
            };
            this._sqsClient = new SQS(sqsClientConfig);
        }
        return this._sqsClient;
    }

    set sqsClient(sqsClient: any) {
        this._sqsClient = sqsClient;
    }

    async sendMessage(event: string, body: KeyableObject): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const messageCommand = this.getPublishMessageCommand(event, body);
            return this.sqsClient.sendMessage(messageCommand).send((err: any, data: any) => {
                if (err) {
                    console.log(`Error while send message to SQS: ${err}`);
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    async receiveMessages(): Promise<SQS.Types.ReceiveMessageResult> {

        return new Promise<any>((resolve, reject) => {
            const messageCommand = this.getReceiverMessageCommand();
            return this.sqsClient.receiveMessage(messageCommand).send((err: any, data: any) => {
                if (err) {
                    console.log(`Error while send message to SQS: ${err}`);
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    async deleteMessage(receiptHandle: string): Promise<any> {

        return new Promise<any>((resolve, reject) => {
            const messageCommand = this.getDeleteMessageCommand(receiptHandle);
            return this.sqsClient.deleteMessage(messageCommand).send((err: any, data: any) => {
                if (err) {
                    console.log(`Error while send message to SQS: ${err}`);
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    private getReceiverMessageCommand(): SQS.Types.ReceiveMessageRequest {
        return {
            QueueUrl: process.env.AWS_SQS_RECEIVER_QUEUE,
            MaxNumberOfMessages: process.env.AWS_SQS_QUEUE_RECEIVE_MAX_MESSAGES || 10
        } as SQS.Types.ReceiveMessageRequest;
    }

    private getDeleteMessageCommand(receiptHandle: string): SQS.Types.DeleteMessageRequest {
        return {
            QueueUrl: process.env.AWS_SQS_RECEIVER_QUEUE,
            ReceiptHandle: receiptHandle
        } as SQS.Types.DeleteMessageRequest;
    }

    private getPublishMessageCommand(event: string, body: KeyableObject): SQS.Types.SendMessageRequest {
        return {
            MessageAttributes: {
                Event: {
                    DataType: 'String',
                    StringValue: event,
                },
            },
            MessageBody: JSON.stringify(body),
            QueueUrl: process.env.AWS_SQS_PUBLISHER_QUEUE,
        } as SQS.Types.SendMessageRequest;
    }
}
