import { APIGatewayProxyEvent, SNSEvent } from 'aws-lambda';
import { APIGatewayEventRequestContextWithAuthorizer } from 'aws-lambda/common/api-gateway';
import { SQSEvent } from 'aws-lambda/trigger/sqs';

const DEFAULT_OPTIONS = { method: "GET", headers: {}, query: {}, path: "/" }

/**
 * Create a mocked API Gateway Lambda event
 * @param message the body message from the request
 * @param options additional options from the request
 */
export function constructAPIGwEvent(message: any, options: any = DEFAULT_OPTIONS): APIGatewayProxyEvent {

    const opts = Object.assign({}, DEFAULT_OPTIONS, options);

    return {
        httpMethod: opts.method,
        resource: opts.method,
        path: opts.path,
        queryStringParameters: opts.query,
        headers: opts.headers,
        body: opts.rawBody || (message) ? JSON.stringify(message) : undefined,
        multiValueHeaders: {},
        multiValueQueryStringParameters: {},
        isBase64Encoded: false,
        pathParameters: opts.pathParameters || {},
        stageVariables: {},
        requestContext: {
            resourcePath: opts.path,
            httpMethod: opts.method,
        } as APIGatewayEventRequestContextWithAuthorizer<any>,
    }
}

/**
 * Create a mocked SQS Lambda event
 * @param message the message in the SQS event
 */
export function constructSQSEvent(message: any): SQSEvent {
    return {
        Records: [
            {
                messageId: "d90fd5a5-fd9e-4ab0-979b-97a1e70c9587",
                receiptHandle: "AQEB3Z4KHgpG7c/PG+QzcQ8+lfkZTtoS902r67GNes0Oo4JvcaEzkpTYoUzWTtbkhwbrJcxX36YvNW73oJXiNRnZjKHMkv9348JwBfLc9ES32IrK7w2RTXJ+Odl1mMIJCnuYGaiM61HxymbBRn3MmDHiOHqPytTwYSUNsZWP+OZRWncmPTBjyqrdq1/bItRLAtIM02WR6r3S+YyjCYLO0kKlYs0g4JZAEJ7CD8VXvDJnuDTBFPGv+5a9HaJRsxwF1LdksC5YYdEQ7uScKHm0gZFGLHyifN6S2J3x6vzooSR72gmUx1Bu43U3yu2arbwbykaO+40NjfsxK/Z43cXStWIlV+V7ZX5kJ9YTpqkOKujZtmZ4fYZXcns/WYEiwuw9eoPFaSMdVJyFCPScNlsGvfcHc8IkjXC0TbhV68XJYb7eR6Y=",
                body: JSON.stringify(message),
                attributes: {
                    ApproximateReceiveCount: "1",
                    SentTimestamp: "1602074535529",
                    SenderId: "123456789012",
                    ApproximateFirstReceiveTimestamp: "1602074535540"
                },
                messageAttributes: {},
                md5OfBody: "033bd94b1168d7e4f0d644c3c95e35bf",
                eventSource: "aws:sqs",
                eventSourceARN: "arn:aws:sqs:us-east-1:123456789012:WriteQueue-KJAGRBTIIB1Y",
                awsRegion: "us-east-1"
            }
        ]
    }
}

/**
 * Create a mocked SNS Lambda event
 * @param message the message in the SNS event
 */
export function constructSNSEvent(message: any): SNSEvent {
    return {
        "Records": [
            {
                "EventSource": "aws:sns",
                "EventVersion": "1.0",
                "EventSubscriptionArn": "arn:{partition}:sns:EXAMPLE",
                "Sns": {
                    "Type": "Notification",
                    "MessageId": "95df01b4-ee98-5cb9-9903-4c221d41eb5e",
                    "TopicArn": "arn:{partition}:sns:EXAMPLE",
                    "Subject": "TestInvoke",
                    "Message": JSON.stringify(message),
                    "Timestamp": "1970-01-01T00:00:00Z",
                    "SignatureVersion": "1",
                    "Signature": "EXAMPLE",
                    "SigningCertUrl": "EXAMPLE",
                    "UnsubscribeUrl": "EXAMPLE",
                    "MessageAttributes": {
                        "Test": {
                            "Type": "String",
                            "Value": "TestString"
                        },
                        "TestBinary": {
                            "Type": "Binary",
                            "Value": "TestBinary"
                        }
                    }
                }
            }
        ]
    }
}