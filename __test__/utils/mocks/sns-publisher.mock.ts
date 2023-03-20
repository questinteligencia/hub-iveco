import { mocked } from 'ts-jest/utils';
import { injector } from '../../../src/shared/injection/injector';
import { TYPES } from '../../../src/shared/injection/types';
import { SNSPublisher } from '../../../src/shared/sns/publisher';

/**
 * Mock the SNSPublisher to not send a message into AWS service
 */
export function createSNSPublisherMock() {

    if (!injector.isBound(TYPES.SNSPublisher)) {
        injector.bind(TYPES.SNSPublisher).to(SNSPublisher);
    }
    const snsPublisher: SNSPublisher = injector.get(TYPES.SNSPublisher);
    snsPublisher.snsClient = mocked({
        publish(messageCommand: any): any {
            const result = {
                promise: function() {
                    return Promise.resolve(undefined);
                },
            };
            return result;
        },
    });
    injector.unbind(TYPES.SNSPublisher);
    injector.bind(TYPES.SNSPublisher).toConstantValue(snsPublisher);
}