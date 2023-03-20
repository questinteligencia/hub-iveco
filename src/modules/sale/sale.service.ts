import {inject, injectable} from "inversify";
import Sale from "./sale.model";
import {AppException} from "../../shared/exceptions/app.exception";
import {isNumber, isValidDate, ptbrDate} from "../../shared/helpers/functions";
import {TYPES} from "../../shared/injection/types";
import {DmsService} from "../dms/dms.service";

@injectable()
export class SaleService {

    private readonly RequiredMsg = 'Campo obrigatório';
    private readonly NumErrorMsg = 'valor informado deve conter apenas números';
    private readonly DateErrorMsg = 'campo data com formato inválido: DD/MM/AAAA';
    private readonly IndecxContactMsg = 'favor informar email ou celular';
    private readonly InvalidTokenMsg = 'Token inválido';

    constructor(
        @inject(TYPES.DmsService) private readonly _dmsService: DmsService) {
    }

    async validate(saleInput: any, integrationKey: string): Promise<any> {
        let errorList = [];
        try {
            Object.keys(saleInput).forEach((k) => saleInput[k] === '' && delete saleInput[k]);
            const id_dms = await this._dmsService.validateToken(integrationKey);
            if (!id_dms) {
                throw new AppException('', 401, '', {message: this.InvalidTokenMsg});
            }
            let {
                conta,
                documento,
                cliente,
                contato,
                cep,
                tipo_endereco,
                endereco_completo,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                celular_principal,
                telefone1,
                telefone2,
                telefone3,
                email_principal,
                chassi,
                modelo,
                ano_fabricacao,
                ano_modelo,
                placa,
                numero_nf,
                data_entrega,
                data_venda,
                vendedor,
                cpf_vendedor,
                cor,
                status_venda,
                tipo_venda,
                segmento,
                subsegmento,
                data_integracao,
                status_integracao,
                optin
            } = saleInput;
            // antes de criar, validar os campos obrigatórios e os que são numéricos, datas e horários
            if (!conta) {
                errorList.push({field: 'conta', msg: this.RequiredMsg});
            }
            if (!documento) {
                errorList.push({field: 'documento', msg: this.RequiredMsg});
            }
            if (!cliente) {
                errorList.push({field: 'cliente', msg: this.RequiredMsg});
            }

            if (celular_principal) {
                if (!isNumber(celular_principal)) {
                    errorList.push({field: 'celular_principal', msg: this.NumErrorMsg});
                }
            }
            if (telefone1) {
                if (!isNumber(telefone1)) {
                    errorList.push({field: 'telefone1', msg: this.NumErrorMsg});
                }
            }
            if (telefone2) {
                if (!isNumber(telefone2)) {
                    errorList.push({field: 'telefone2', msg: this.NumErrorMsg});
                }
            }
            if (telefone3) {
                if (!isNumber(telefone3)) {
                    errorList.push({field: 'telefone3', msg: this.NumErrorMsg});
                }
            }
            // when a customer does not have email, it comes with 'clientesememail'
            if (email_principal) {
                if (email_principal.toLowerCase().indexOf('clientesememail') !== -1) {
                    email_principal = null;
                }
            }

            // verifica se recebeu email ou telefone
            if ((!email_principal) && (!celular_principal)) {
                errorList.push({field: 'email_principal/celular_principal', msg: this.IndecxContactMsg});
            }
            if (ano_fabricacao) {
                if (!isNumber(ano_fabricacao)) {
                    errorList.push({field: 'ano_fabricacao', msg: this.NumErrorMsg});
                }
            }
            if (ano_modelo) {
                if (!isNumber(ano_modelo)) {
                    errorList.push({field: 'ano_modelo', msg: this.NumErrorMsg});
                }
            }
            if (numero_nf) {
                if (!isNumber(numero_nf)) {
                    errorList.push({field: 'numero_nf', msg: this.NumErrorMsg});
                }
            }
            if (data_entrega) {
                if (!isValidDate(data_entrega)) {
                    errorList.push({field: 'data_entrega', msg: this.DateErrorMsg});
                } else {
                    data_entrega = ptbrDate(data_entrega);
                }
            } else {
                errorList.push({field: 'data_entrega', msg: this.RequiredMsg});
            }
            if (data_venda) {
                if (!isValidDate(data_venda)) {
                    errorList.push({field: 'data_venda', msg: this.DateErrorMsg});
                } else {
                    data_venda = ptbrDate(data_venda);
                }
            }
            if (errorList.length > 0) {
                throw new AppException('', 412, '', errorList);
            }
            return {
                id_dms,
                conta,
                documento,
                cliente,
                contato,
                cep,
                tipo_endereco,
                endereco_completo,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                celular_principal,
                telefone1,
                telefone2,
                telefone3,
                email_principal,
                chassi,
                modelo,
                ano_fabricacao,
                ano_modelo,
                placa,
                numero_nf,
                data_entrega,
                data_venda,
                vendedor,
                cpf_vendedor,
                cor,
                status_venda,
                tipo_venda,
                segmento,
                subsegmento,
                data_integracao,
                status_integracao,
                optin
            };
        } catch (error) {
            console.log(error);
            if (error instanceof AppException) {
                throw error;
            }
            throw new AppException('Falha ao integrar venda.', 500)
        }
    }

    async persist(sale: any) {
        await Sale.update(
            {status_integracao: 'duplicado'},
            {where: {status_integracao: 'criado', documento: sale.documento}}
        );
        await Sale.create(sale);
    }
}