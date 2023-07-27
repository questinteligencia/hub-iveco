import {inject, injectable} from "inversify";
import AfterSale from "./after-sale.model";
import {AppException} from "../../shared/exceptions/app.exception";
import {bdNumber, isNumber, isValidDate, isValidTime, ptbrDate} from "../../shared/helpers/functions";
import {TYPES} from "../../shared/injection/types";
import {DmsService} from "../dms/dms.service";

@injectable()
export class AfterSaleService {

    private readonly RequiredMsg = 'Campo obrigatório';
    private readonly NumErrorMsg = 'valor informado deve conter apenas números';
    private readonly DateErrorMsg = 'campo data com formato inválido: DD/MM/AAAA';
    private readonly TimeErrorMsg = 'campo horário com formato inválido: HH:MM';
    private readonly IndecxContactMsg = 'favor informar email ou celular';
    private readonly InvalidTokenMsg = 'Token inválido';

    constructor(
        @inject(TYPES.DmsService) private readonly _dmsService: DmsService) {
    }

    async validate(afterSaleInput: any, integrationKey: string): Promise<any> {
        let errorList = [];
        try {
            Object.keys(afterSaleInput).forEach((k) => afterSaleInput[k] === '' && delete afterSaleInput[k]);
            // const dms_id = 1;
            const dms_id = await this._dmsService.validateToken(integrationKey);
            if (!dms_id) {
                throw new AppException('', 401, '', {message: this.InvalidTokenMsg});
            }
            let {
                dealer_id,
                documento,
                nome_cliente,
                contato,
                ddd1,
                telefone1,
                whatsapp,
                ddd2,
                telefone2,
                ddd3,
                telefone3,
                chassi,
                modelo,
                status_os,
                garantia,
                numero_os,
                data_abertura,
                data_liberacao,
                email,
                segmento,
                consultor,
                status_integracao,
            } = afterSaleInput;

            // antes de criar, validar os campos obrigatórios e os que são numéricos, datas e horários
            if (dms_id) {
                if (!isNumber(dms_id)) {
                    errorList.push({field: 'dms_id', msg: this.NumErrorMsg});
                }
            } else {
                errorList.push({field: 'dms_id', msg: this.RequiredMsg});
            }
            if (!dealer_id) {
                errorList.push({field: 'dealer_id', msg: this.RequiredMsg});
            }
            if (documento) {
                if (!isNumber(documento)) {
                    errorList.push({field: 'documento', msg: this.NumErrorMsg});
                }
            } else {
                errorList.push({field: 'documento', msg: this.RequiredMsg});
            }
            if (!nome_cliente) {
                errorList.push({field: 'nome_cliente', msg: this.RequiredMsg});
            }
            if (ddd1) {
                if (!isNumber(ddd1)) {
                    errorList.push({field: 'ddd1', msg: this.NumErrorMsg});
                }
            } else {
                errorList.push({field: 'ddd1', msg: this.RequiredMsg});
            }
            if (telefone1) {
                if (!isNumber(telefone1)) {
                    errorList.push({field: 'telefone1', msg: this.NumErrorMsg});
                }
            } else {
                errorList.push({field: 'telefone1', msg: this.RequiredMsg});
            }

            if (ddd2) {
                if (!isNumber(ddd2)) {
                    errorList.push({field: 'ddd2', msg: this.NumErrorMsg});
                }
            }
            if (telefone2) {
                if (!isNumber(telefone2)) {
                    errorList.push({field: 'telefone2', msg: this.NumErrorMsg});
                }
            }
            if (ddd3) {
                if (!isNumber(ddd3)) {
                    errorList.push({field: 'ddd3', msg: this.NumErrorMsg});
                }
            }
            if (telefone3) {
                if (!isNumber(telefone3)) {
                    errorList.push({field: 'telefone3', msg: this.NumErrorMsg});
                }
            }
            if (!chassi) {
                errorList.push({field: 'chassi', msg: this.RequiredMsg});
            }
            if (!modelo) {
                errorList.push({field: 'modelo', msg: this.RequiredMsg});
            }
            if (!status_os) {
                errorList.push({field: 'status_os', msg: this.RequiredMsg});
            }
            if (!garantia) {
                errorList.push({field: 'garantia', msg: this.RequiredMsg});
            }
            if (numero_os) {
                if (!isNumber(numero_os)) {
                    errorList.push({field: 'numero_os', msg: this.NumErrorMsg});
                }
            } else {
                errorList.push({field: 'numero_os', msg: this.RequiredMsg});
            }
            if (data_abertura) {
                if (!isValidDate(data_abertura)) {
                    errorList.push({field: 'data_abertura', msg: this.DateErrorMsg});
                } else {
                    data_abertura = ptbrDate(data_abertura);
                }
            } else {
                errorList.push({field: 'data_abertura', msg: this.RequiredMsg});
            }
            if (data_liberacao) {
                if (!isValidDate(data_liberacao)) {
                    errorList.push({field: 'data_liberacao', msg: this.DateErrorMsg});
                } else {
                    data_liberacao = ptbrDate(data_liberacao);
                }
            } else {
                errorList.push({field: 'data_liberacao', msg: this.RequiredMsg});
            }


            if (errorList.length > 0) {
                throw new AppException('', 412, '', errorList);
            }
            return {
                dms_id,
                dealer_id,
                documento,
                nome_cliente,
                contato,
                ddd1,
                telefone1,
                whatsapp,
                ddd2,
                telefone2,
                ddd3,
                telefone3,
                chassi,
                modelo,
                status_os,
                garantia,
                numero_os,
                data_abertura,
                data_liberacao,
                email,
                segmento,
                consultor,
                status_integracao,
            };
        } catch (error) {
            console.log(error);
            if (error instanceof AppException) {
                throw error;
            }
            throw new AppException('Falha ao integrar serviço.', 500)
        }
    }

    async persist(afterSale: any) {
        /*
        await AfterSale.update(
            {status_integracao: 'duplicado'},
            {where: {status_integracao: 'criado', documento: afterSale.documento}}
        );
        */
        await AfterSale.create(afterSale);
    }
}