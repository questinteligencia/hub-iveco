import 'reflect-metadata';
import {injector} from "../../src/shared/injection/injector";
import {TYPES} from "../../src/shared/injection/types";
import {SaleService} from "../../src/modules/sale/sale.service";
import {createDmsServiceMock} from "../utils/mocks/dms-service.mock";
import {createSQSClientMock} from "../utils/mocks/sqs-publisher.mock";
import {sqsEventHandler} from "../../src/handlers/sale/processor";
import {constructSQSEvent} from "../utils/helpers";

jest.mock('sequelize');

describe('Handler persist sale', () => {

    // Clear all mocks before execute every test and recreate AfterSaleService in the dependency injector
    beforeEach(() => {
        jest.clearAllMocks();
        // Removes all the existing service instance from injector
        injector.unbindAll();
        injector.bind(TYPES.SaleService).to(SaleService);
        injector.bind(TYPES.DmsService).toConstantValue(createDmsServiceMock(100));
    });

    // Test 1 - Persist sale
    it('[01] persist sale', async () => {

        createSQSClientMock();

        const sale = {
            "id_dms": 100,
            "conta": "AAA2000",
            "documento": "15413336000000",
            "cliente": "JOSE DOS SANTOS LTDA",
            "contato": "JOSE",
            "cep": "36180000",
            "tipo_endereco": "Avenida",
            "endereco_completo": "AV. PROFESSOR PAULO DE TARSO ",
            "numero": "500",
            "bairro": "DISTRITO INDUSTRIAL",
            "estado": "MG",
            "celular_principal": "32984012894",
            "telefone1": "3235700000",
            "telefone2": "3235700000",
            "telefone3": "32984012894",
            "email_principal": "js@gmail.com",
            "chassi": "9BM958154MB219437",
            "modelo": "ATEGO 1719/48",
            "ano_fabricacao": "2021",
            "ano_modelo": "2021",
            "numero_nf": "41104",
            "data_entrega": "12/20/2021",
            "vendedor": "Jose Flavio Gaudereto Rocha",
            "cpf_vendedor": "57963517615",
            "cor": "CINZA ACO ",
            "status_venda": "Efetuada (E)",
            "segmento": "Automovel",
            "subsegmento": "Seme-Pesado"
        };

        const event = constructSQSEvent(sale)

        await sqsEventHandler(event);
    })
})