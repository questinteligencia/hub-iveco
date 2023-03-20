import {injectable} from "inversify";
import Dms from "./dms.model";

@injectable()
export class DmsService {

    async validateToken(integrationKey: string): Promise<number> {
        return this.findDmsByDb(integrationKey);
    }

    private async findDmsByDb(integrationKey: string) {
        let dms = await Dms.findOne({
            attributes: ['id'],
            where: { hash: integrationKey }
        });
        if (dms) {
            return dms.id;
        }
        return null;
    }
}