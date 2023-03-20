import { mocked } from 'ts-jest/utils';
import { injector } from '../../../src/shared/injection/injector';
import { TYPES } from '../../../src/shared/injection/types';
import { SQSClient } from '../../../src/shared/sqs/sqs-client';
import { SQS } from 'aws-sdk';

/**
 * Mock the SQSPublisher to not send a message into AWS service
 */
export function createSQSClientMock() {

    if (!injector.isBound(TYPES.SQSClient)) {
        injector.bind(TYPES.SQSClient).to(SQSClient);
    }
    const sqsClient: SQSClient = injector.get(TYPES.SQSClient);
    sqsClient.sqsClient = mocked({
        sendMessage(messageCommand: SQS.SendMessageRequest): any {
            const result = {
                send: function send(callback: any) {
                    callback.call();
                }
            };
            return result;
        },
    });
    injector.unbind(TYPES.SQSClient);
    injector.bind(TYPES.SQSClient).toConstantValue(sqsClient);
}