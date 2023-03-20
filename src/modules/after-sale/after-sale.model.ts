import {DataTypes, Model, Optional} from 'sequelize'
import connection from "../../config/database";

export interface AfterSaleAttributes {
    id: number;
    dms_id: number;
    dealer_id: string;
    documento: number;
    nome_cliente: string;
    contato: string;
    ddd1: number;
    telefone1: number;
    whatsapp: string;
    ddd2: number;
    telefone2: number;
    ddd3: number;
    telefone3: number;
    chassi: string;
    modelo: string;
    status_os: string;
    garantia: string;
    numero_os: number;
    data_abertura: Date;
    data_liberacao: Date;
    email: string;
    status_integracao: string;
}

export interface AfterSaleInput extends Optional<AfterSaleAttributes, 'id'> {}

export interface AfterSaleOuput extends Required<AfterSaleInput> {}

class AfterSale extends Model<AfterSaleAttributes, AfterSaleInput> {
    id: number;
    dms_id: number;
    dealer_id: string;
    documento: number;
    nome_cliente: string;
    contato: string;
    ddd1: number;
    telefone1: number;
    whatsapp: string;
    ddd2: number;
    telefone2: number;
    ddd3: number;
    telefone3: number;
    chassi: string;
    modelo: string;
    status_os: string;
    garantia: string;
    numero_os: number;
    data_abertura: Date;
    data_liberacao: Date;
    email: string;
    status_integracao: string;
}

AfterSale.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    dms_id: DataTypes.INTEGER,
    dealer_id: DataTypes.STRING,
    documento: DataTypes.INTEGER,
    nome_cliente: DataTypes.STRING,
    contato: DataTypes.STRING,
    ddd1: DataTypes.INTEGER,
    telefone1: DataTypes.INTEGER,
    whatsapp: DataTypes.STRING,
    ddd2: DataTypes.INTEGER,
    telefone2: DataTypes.INTEGER,
    ddd3: DataTypes.INTEGER,
    telefone3: DataTypes.INTEGER,
    chassi: DataTypes.STRING,
    modelo: DataTypes.STRING,
    status_os: DataTypes.STRING,
    garantia: DataTypes.STRING,
    numero_os: DataTypes.INTEGER,
    data_abertura: {
        type: DataTypes.DATE,
    },
    data_liberacao: {
        type: DataTypes.DATE,
    },
    email: DataTypes.STRING,
    status_integracao: DataTypes.STRING,
}, {
    sequelize: connection,
    modelName: 'aftersales',
    tableName: 'aftersales',
})

export default AfterSale