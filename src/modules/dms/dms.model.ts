import {DataTypes, Model, Optional} from 'sequelize'
import connection from "../../config/database";

export interface DmsAttributes {
    id: number;
    descricao: string;
    hash: string;
    active: boolean;
}

export interface DmsInput extends Optional<DmsAttributes, 'id'> {}

class Dms extends Model<DmsAttributes, DmsInput> {
    id: number;
    descricao: string;
    hash: string;
    active: boolean;
}

Dms.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    descricao: DataTypes.STRING,
    hash: DataTypes.STRING,
    active: DataTypes.BOOLEAN
}, {
    sequelize: connection,
    modelName: 'dms',
    tableName: 'dms',
})

export default Dms