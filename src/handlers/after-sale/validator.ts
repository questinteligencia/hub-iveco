import 'reflect-metadata';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BaseApiGatewayHandler } from '../../core/handlers/base-api-gateway.handler';
import { injector } from '../../shared/injection/injector';
import { TYPES } from '../../shared/injection/types';
import { SQSClient } from '../../shared/sqs/sqs-client';
import { AfterSaleService } from '../../modules/after-sale/after-sale.service';

/** This class process the first event when a sale is received, the validation */
class AfterSaleValidatorHandler extends BaseApiGatewayHandler {

    private readonly SQS_EVENT = 'after-sale:store';
    private readonly TOKEN = 'integration-key';
    private readonly SUCCESS_MESSAGE = 'Serviço integrado com sucesso!';

    constructor() {
        super();
    }

    /** Validate the after sale data, if valid, send to SQS to starts the processing off validate */
    async processEvent(event: APIGatewayProxyEvent): Promise<any> {
        const integrationKey = event.headers[this.TOKEN] || '';
        const afterSaleInput = JSON.parse(event.body);

        const afterSaleService: AfterSaleService = injector.get(TYPES.AfterSaleService);
        const afterSale: any = await afterSaleService.validate(afterSaleInput, integrationKey);

        const sqsPublisher: SQSClient = injector.get(TYPES.SQSClient);
        await sqsPublisher.sendMessage(this.SQS_EVENT, afterSale);

        return {
            message: this.SUCCESS_MESSAGE
        }
    }

    protected getResultStatusCode() {
        return 201;
    }
}

/** This function starts the processes of validation */
export const requestApiHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const saleValidatorHandler = new AfterSaleValidatorHandler();
    return saleValidatorHandler.handler(event);
};
