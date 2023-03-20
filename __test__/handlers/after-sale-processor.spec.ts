import 'reflect-metadata';
import {injector} from "../../src/shared/injection/injector";
import {TYPES} from "../../src/shared/injection/types";
import {createDmsServiceMock} from "../utils/mocks/dms-service.mock";
import {createSQSClientMock} from "../utils/mocks/sqs-publisher.mock";
import {sqsEventHandler} from "../../src/handlers/after-sale/processor";
import {constructSQSEvent} from "../utils/helpers";
import {AfterSaleService} from "../../src/modules/after-sale/after-sale.service";

jest.mock('sequelize');

describe('Handler persist after sale', () => {

    // Clear all mocks before execute every test and recreate AfterSaleService in the dependency injector
    beforeEach(() => {
        jest.clearAllMocks();
        // Removes all the existing service instance from injector
        injector.unbindAll();
        injector.bind(TYPES.AfterSaleService).to(AfterSaleService);
        injector.bind(TYPES.DmsService).toConstantValue(createDmsServiceMock(100));
    });

    // Test 1 - Persist after sale
    it('[01] persist after sale', async () => {

        createSQSClientMock();

        const sale = {
          "id_dms": 100,
          "conta": "CCCBBAAA",
          "documento": "35691969000130",
          "cliente": "Teste Indecx.",
          "contato": "Teste Indecx.",
          "cep": "89140000",
          "tipo_endereco": "Rua",
          "endereco_completo": "RUA MARQUES DO HERVAL, 1185",
          "complemento": "SALA 03",
          "bairro": "PONTO CHIC",
          "cidade": "IBIRAMA",
          "estado": "SC",
          "celular_principal": "47988579928",
          "telefone2": "4733573602",
          "telefone3": "47988579928",
          "chassi": "9BM958434GB026150",
          "modelo": "CAMINHAO-TRATOR AXOR 2041 S/36",
          "ano_fabricacao": "2015",
          "ano_modelo": "2016",
          "placa": "QIA-2336",
          "km": "333698",
          "numero_os": "152100",
          "cit": "5N",
          "valor_pecas": "120.5",
          "valor_mo": "190",
          "data_fechamento_os": "04/14/2021",
          "descricao_servico": "5N - Garantia Caminhoes (MB)",
          "consultor": "Cleiton Fabrício Mohr",
          "data_abertura_os": "04/13/2021",
          "status_os": "Encerrada",
          "data_entrada_portaria": "04/13/2021",
          "data_saida_portaria": "04/14/2021",
          "hr_abertura_os": "14:58",
          "hr_fechamento_os": "09:10",
          "numero_nf": "86991",
          "hr_vendidas": "1,9",
          "hr_aplicadas": "1,94",
          "data_primeiro_apontamento": "04/13/2021",
          "hr_inicio_primeiro_apontamento": "16:00",
          "data_termino_apontamento": "04/13/2021",
          "data_faturamento_os": "04/14/2021",
          "hr_faturamento_os": "09:10",
          "segmento": "Caminhões ExtraPesados",
          "optin": "Sim"
        };

        const event = constructSQSEvent(sale)

        await sqsEventHandler(event);
    })
})