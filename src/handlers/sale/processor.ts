import 'reflect-metadata';
import {BaseSQSHandler} from '../../core/handlers/base-sqs.handler';
import {SQSEvent} from 'aws-lambda/trigger/sqs';
import {injector} from '../../shared/injection/injector';
import {TYPES} from '../../shared/injection/types';
import {SaleService} from "../../modules/sale/sale.service";

/** This class persist the sale */
class SaleProcessorHandler extends BaseSQSHandler {

    /** Persist the sale */
    async processEvent(event: any): Promise<void> {

        const salesService: SaleService = injector.get(TYPES.SaleService);
        await salesService.persist(event);
    }
}

/** This function starts the process of save the sale */
export const sqsEventHandler = async (event: SQSEvent): Promise<void> => {
    const saleProcessorHandler: SaleProcessorHandler = new SaleProcessorHandler();
    return saleProcessorHandler.handler(event);
};


