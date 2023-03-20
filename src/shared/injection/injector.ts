import {Container} from 'inversify';
import {TYPES} from './types';
import {SQSClient} from '../sqs/sqs-client';
import {SNSPublisher} from '../sns/publisher';
import {S3Upload} from '../s3/upload';
import {SaleService} from '../../modules/sale/sale.service';
import {AfterSaleService} from '../../modules/after-sale/after-sale.service';
import {DmsService} from "../../modules/dms/dms.service";

const injector = new Container({defaultScope: 'Singleton', skipBaseClassChecks: true});

injector.bind(TYPES.AfterSaleService).to(AfterSaleService);
injector.bind(TYPES.DmsService).to(DmsService);
injector.bind(TYPES.SaleService).to(SaleService);
injector.bind(TYPES.SQSClient).to(SQSClient);
injector.bind(TYPES.SNSPublisher).to(SNSPublisher);
injector.bind(TYPES.S3Upload).to(S3Upload);

export {injector};