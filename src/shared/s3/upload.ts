import { S3 } from 'aws-sdk';
import { injectable } from 'inversify';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';

@injectable()
export class S3Upload {

    constructor() {
    }

    private _s3Client: S3;

    get s3Client() {
        if (!this._s3Client) {
            const s3ClientConfig = {
                region: process.env.AWS_S3_REGION,
            };
            this._s3Client = new S3(s3ClientConfig);
        }
        return this._s3Client;
    }

    set s3Client(s3Client: any) {
        this._s3Client = s3Client;
    }

    async uploadFile(bucket: string, key: string, body: Buffer, type: string): Promise<ManagedUpload.SendData> {
        const s3Params = {
            Bucket: bucket,
            Key: `${key}.${type}`,
            Body: body,
            ACL: "public-read",
            ContentEncoding: "base64",
            ContentType: `audio/${type}`
        };
        return this.s3Client.upload(s3Params).promise();
    }
}
