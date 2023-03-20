import { BaseEventHandler } from './base.handler';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { serialize } from 'class-transformer';
import { BadRequestException } from '../../shared/exceptions/bad-request.exception';
import { AppException } from '../../shared/exceptions/app.exception';

/** This class is used to handle AWS Lambdas with source event API Gateways */
export abstract class BaseApiGatewayHandler extends BaseEventHandler<APIGatewayProxyEvent, APIGatewayProxyResult> {

    private readonly headers = {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST"
    }

    /** Process the API Gateways event and returns the http result */
    async handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        let resultAPI;
        try {
            console.log('received:', event);
            if (event.body) {

                await this.initialize();
                const result = await this.processEvent(event);

                resultAPI = {
                    statusCode: this.getResultStatusCode(),
                    headers: this.headers,
                    body: result ? serialize(result) : '',
                };
            } else {
                throw new BadRequestException('Invalid api content');
            }
        } catch (e: any) {
            console.error(e);
            if (e instanceof AppException) {
                resultAPI = {
                    statusCode: e.statusCode,
                    headers: this.headers,
                    body: JSON.stringify(e.result ? e.result : { error: e?.message || e?.name || 'Internal server error' }),
                };
            } else {
                resultAPI = {
                    statusCode: 500,
                    headers: this.headers,
                    body: JSON.stringify({ error: e?.message || 'Internal server error' }),
                };
            }
        } finally {
            console.log('response: ', JSON.stringify(resultAPI));
            return resultAPI;
        }
    }

    abstract processEvent(event: APIGatewayProxyEvent): Promise<any>;

    protected getResultStatusCode() {
        return 200;
    }
}