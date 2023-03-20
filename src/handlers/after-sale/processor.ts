import 'reflect-metadata';
import {BaseSQSHandler} from '../../core/handlers/base-sqs.handler';
import {SQSEvent} from 'aws-lambda/trigger/sqs';
import {injector} from '../../shared/injection/injector';
import {TYPES} from '../../shared/injection/types';
import {AfterSaleService} from "../../modules/after-sale/after-sale.service";

/** This class persist the after sale */
class AfterSaleProcessorHandler extends BaseSQSHandler {

    /** Persist the after sale */
    async processEvent(event: any): Promise<void> {

        const afterSaleService: AfterSaleService = injector.get(TYPES.AfterSaleService);
        await afterSaleService.persist(event);
    }
}

/** This function starts the process of save the after sale */
export const sqsEventHandler = async (event: SQSEvent): Promise<void> => {
    const afterSaleProcessorHandler: AfterSaleProcessorHandler = new AfterSaleProcessorHandler();
    console.log('evento', event);
    return afterSaleProcessorHandler.handler(event);
};


