import { mocked } from 'ts-jest/utils';
import { injector } from '../../../src/shared/injection/injector';
import { TYPES } from '../../../src/shared/injection/types';
import { SNSPublisher } from '../../../src/shared/sns/publisher';
import { S3Upload } from '../../../src/shared/s3/upload';

/**
 * Mock the SNSPublisher to not send a message into AWS service
 */
export function createS3UploadMock() {

    if (!injector.isBound(TYPES.S3Upload)) {
        injector.bind(TYPES.S3Upload).to(S3Upload);
    }
    const s3Upload: S3Upload = injector.get(TYPES.S3Upload);
    s3Upload.s3Client = mocked({
        upload(messageCommand: any): any {
            const result = {
                promise: function() {
                    return Promise.resolve('https://audio-responses.s3.amazonaws.com/11111-2222-3333-444444444444.mp3');
                },
            };
            return result;
        },
    });
    injector.unbind(TYPES.S3Upload);
    injector.bind(TYPES.S3Upload).toConstantValue(s3Upload);
}