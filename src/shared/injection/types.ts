import {SQSClient} from "../sqs/sqs-client";

const TYPES = {
    DmsService: Symbol.for('DmsService'),
    SaleService: Symbol.for('SaleService'),
    AfterSaleService: Symbol.for('AfterSaleService'),
    SQSClient: Symbol.for('SQSClient'),
    SNSPublisher: Symbol.for('SNSPublisher'),
    S3Upload: Symbol.for('S3Upload'),
};

export {TYPES};