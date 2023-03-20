import {BaseEventHandler} from "./base.handler";
import {ScheduledEvent} from "aws-lambda";

/** This class is used to handle AWS Lambdas with schedule event */
export abstract class BaseScheduleEventHandler extends BaseEventHandler<ScheduledEvent, void> {

    async handler(event: ScheduledEvent): Promise<void> {
        await this.initialize();
        await this.processEvent();
    }

    abstract processEvent(): Promise<void>;
}
