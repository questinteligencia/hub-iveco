import {DataTypes, Model, Optional} from 'sequelize'
import connection from "../../config/database";

export interface SaleAttributes {
    id: number;
    id_dms: number;
    conta: string;
    documento: string;
    cliente: string;
    contato: string;
    cep: string;
    tipo_endereco: string;
    endereco_completo: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    celular_principal: number;
    telefone1: number;
    telefone2: number;
    telefone3: number;
    email_principal: string;
    chassi: string;
    modelo: string;
    ano_fabricacao: number;
    ano_modelo: number;
    placa: string;
    numero_nf: number;
    data_entrega: Date;
    data_venda: Date;
    vendedor: string;
    cpf_vendedor: string;
    cor: string;
    status_venda: string;
    tipo_venda: string;
    segmento: string;
    subsegmento: string;
    data_integracao: Date;
    status_integracao: string;
    optin: string;
}

export interface SaleInput extends Optional<SaleAttributes, 'id'> {}

export interface SaleOuput extends Required<SaleInput> {}

class Sale extends Model<SaleAttributes, SaleInput> {
    id: number;
    id_dms: number;
    conta: string;
    documento: string;
    cliente: string;
    contato: string;
    cep: string;
    tipo_endereco: string;
    endereco_completo: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    celular_principal: number;
    telefone1: number;
    telefone2: number;
    telefone3: number;
    email_principal: string;
    chassi: string;
    modelo: string;
    ano_fabricacao: number;
    ano_modelo: number;
    placa: string;
    numero_nf: number;
    data_entrega: Date;
    data_venda: Date;
    vendedor: string;
    cpf_vendedor: string;
    cor: string;
    status_venda: string;
    tipo_venda: string;
    segmento: string;
    subsegmento: string;
    data_integracao: Date;
    status_integracao: string;
    optin: string;
}

Sale.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    id_dms: DataTypes.INTEGER,
    conta: DataTypes.STRING,
    documento: DataTypes.STRING,
    cliente: DataTypes.STRING,
    contato: DataTypes.STRING,
    cep: DataTypes.STRING,
    tipo_endereco: DataTypes.STRING,
    endereco_completo: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    celular_principal: DataTypes.BIGINT,
    telefone1: DataTypes.BIGINT,
    telefone2: DataTypes.BIGINT,
    telefone3: DataTypes.BIGINT,
    email_principal: DataTypes.STRING,
    chassi: DataTypes.STRING,
    modelo: DataTypes.STRING,
    ano_fabricacao: DataTypes.INTEGER,
    ano_modelo: DataTypes.INTEGER,
    placa: DataTypes.STRING,
    numero_nf: DataTypes.INTEGER,
    data_entrega: {
        type: DataTypes.DATE,
//          get() {
//            return moment(this.getDataValue('data_entrega')).format('DD/MM/YYYY');
//            }
    },
    data_venda: {
        type: DataTypes.DATE,
        // get() {
        //     return moment(this.getDataValue('data_venda')).format('DD/MM/YYYY');
        // }
    },
    vendedor: DataTypes.STRING,
    cpf_vendedor: DataTypes.STRING,
    cor: DataTypes.STRING,
    status_venda: DataTypes.STRING,
    tipo_venda: DataTypes.STRING,
    segmento: DataTypes.STRING,
    subsegmento: DataTypes.STRING,
    data_integracao: DataTypes.DATE,
    status_integracao: DataTypes.STRING,
    optin: DataTypes.STRING,
}, {
    sequelize: connection,
    modelName: 'sales',
    tableName: 'sales',
})

export default Sale