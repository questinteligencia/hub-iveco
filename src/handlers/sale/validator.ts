import 'reflect-metadata';
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {BaseApiGatewayHandler} from '../../core/handlers/base-api-gateway.handler';
import {injector} from '../../shared/injection/injector';
import {TYPES} from '../../shared/injection/types';
import {SaleService} from "../../modules/sale/sale.service";
import {SQSClient} from "../../shared/sqs/sqs-client";

/** This class process the first event when a sale is received, the validation */
class SaleValidatorHandler extends BaseApiGatewayHandler {

    private readonly SQS_EVENT = 'sale:store';
    private readonly TOKEN = 'integration-key';
    private readonly SUCCESS_MESSAGE = 'Venda integrada com sucesso!';

    constructor() {
        super();
    }

    /** Validate the sale data, if valid, send to SQS to starts the processing off validate */
    async processEvent(event: APIGatewayProxyEvent): Promise<any> {
        const integrationKey = event.headers[this.TOKEN] || '';
        const saleInput = JSON.parse(event.body);

        const salesService: SaleService = injector.get(TYPES.SaleService);
        const sale: any = await salesService.validate(saleInput, integrationKey);

        const sqsPublisher: SQSClient = injector.get(TYPES.SQSClient);
        await sqsPublisher.sendMessage(this.SQS_EVENT, sale);

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
    const saleValidatorHandler = new SaleValidatorHandler();
    return saleValidatorHandler.handler(event);
};
