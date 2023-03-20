import {mocked} from 'ts-jest/utils';

/**
 * Creates a mocked DmsService
 * @param token
 */
export function createDmsServiceMock(dmsId?: number) {
    return {
        async validateToken(integrationKey: number): Promise<number> {
            return Promise.resolve(dmsId);
        }
    };
}