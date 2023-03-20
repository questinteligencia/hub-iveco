/** This class is used to handle AWS Lambdas and initialize some applications */
export abstract class BaseEventHandler<T, R> {

    async initialize() {
    }

    abstract handler(event: T): Promise<R>;
}
