import 'reflect-metadata';
import {requestApiHandler} from '../../src/handlers/sale/validator';
import {constructAPIGwEvent} from '../utils/helpers';
import {injector} from '../../src/shared/injection/injector';
import {TYPES} from '../../src/shared/injection/types';
import {SaleService} from "../../src/modules/sale/sale.service";
import {createSQSClientMock} from "../utils/mocks/sqs-publisher.mock";
import {createDmsServiceMock} from "../utils/mocks/dms-service.mock";

// Defines the validate sale handler suite test
describe('Handler validate sale', () => {

    // Clear all mocks before execute every test and recreate AfterSaleService in the dependency injector
    beforeEach(() => {
        jest.clearAllMocks();
        // Removes all the existing service instance from injector
        injector.unbindAll();
        injector.bind(TYPES.SaleService).to(SaleService);
        injector.bind(TYPES.DmsService).toConstantValue(createDmsServiceMock(100));
    });

    // Test 1 - Validate the invalid sale
    it('[01] invalid sale', async () => {

        // Create a API Gateway
        const event = constructAPIGwEvent({
            "contato": "JOSE",
            "cep": "36180000",
            "tipo_endereco": "Avenida",
            "endereco_completo": "AV. PROFESSOR PAULO DE TARSO ",
            "numero": "500",
            "complemento": "",
            "bairro": "DISTRITO INDUSTRIAL",
            "cidade": "",
            "estado": "MG",
            "telefone1": "B3235700000",
            "telefone2": "C3235700000",
            "telefone3": "D32984012894",
            "chassi": "9BM958154MB219437",
            "modelo": "ATEGO 1719/48",
            "ano_fabricacao": "A2021",
            "ano_modelo": "A2021",
            "placa": "",
            "numero_nf": "A41104",
            "data_entrega": "",
            "data_venda": "01/13/2000",
            "vendedor": "Jose Flavio Gaudereto Rocha",
            "cpf_vendedor": "57963517615",
            "cor": "CINZA ACO ",
            "status_venda": "Efetuada (E)",
            "tipo_venda": "",
            "segmento": "Automovel",
            "subsegmento": "Seme-Pesado",
            "optin": "Sim"
        }, {method: 'POST', headers: { 'integration-key': '11223344556677' } });

        // Call the event handler
        const result = await requestApiHandler(event);
        const body = result.body !== '' ? JSON.parse(result.body) : undefined;

        // Check the response
        expect(result.statusCode).toBe(412);
        expect(body.filter((e: any) => e.field === 'conta')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'documento')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'cliente')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'telefone1')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'telefone2')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'telefone3')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'email_principal/celular_principal')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'ano_fabricacao')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'ano_modelo')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'numero_nf')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_entrega')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_venda')).toEqual(expect.any(Object));
    });

    // Test 2 - Validate the invalid sale 2
    it('[02] invalid sale 2', async () => {

        // Create a API Gateway
        const event = constructAPIGwEvent({
            "contato": "JOSE",
            "cep": "36180000",
            "tipo_endereco": "Avenida",
            "endereco_completo": "AV. PROFESSOR PAULO DE TARSO ",
            "numero": "500",
            "complemento": "",
            "bairro": "DISTRITO INDUSTRIAL",
            "cidade": "",
            "estado": "MG",
            "email_principal": "clientesememail@teste.com",
            "celular_principal": "B3235700000",
            "telefone1": "B3235700000",
            "telefone2": "C3235700000",
            "telefone3": "D32984012894",
            "chassi": "9BM958154MB219437",
            "modelo": "ATEGO 1719/48",
            "ano_fabricacao": "A2021",
            "ano_modelo": "A2021",
            "placa": "",
            "numero_nf": "A41104",
            "data_entrega": "01/13/2000",
            "data_venda": "01/13/2000",
            "vendedor": "Jose Flavio Gaudereto Rocha",
            "cpf_vendedor": "57963517615",
            "cor": "CINZA ACO ",
            "status_venda": "Efetuada (E)",
            "tipo_venda": "",
            "segmento": "Automovel",
            "subsegmento": "Seme-Pesado",
            "optin": "Sim"
        }, {method: 'POST', headers: { 'integration-key': '11223344556677' }});

        // Call the event handler
        const result = await requestApiHandler(event);
        const body = result.body !== '' ? JSON.parse(result.body) : undefined;

        // Check the response
        expect(result.statusCode).toBe(412);
        expect(body.filter((e: any) => e.field === 'conta')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'documento')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'cliente')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'telefone1')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'telefone2')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'telefone3')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_entrega')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'celular_principal')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'ano_fabricacao')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'ano_modelo')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'numero_nf')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_venda')).toEqual(expect.any(Object));
    });

    // Test 3 - Validate the valid sale
    it('[03] valid sale', async () => {

        createSQSClientMock();

        // Create a API Gateway
        const event = constructAPIGwEvent({
            "conta": "AAA2000",
            "documento": "15413336000000",
            "cliente": "JOSE DOS SANTOS LTDA",
            "contato": "JOSE",
            "cep": "36180000",
            "tipo_endereco": "Avenida",
            "endereco_completo": "AV. PROFESSOR PAULO DE TARSO ",
            "numero": "500",
            "complemento": "",
            "bairro": "DISTRITO INDUSTRIAL",
            "cidade": "",
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
            "placa": "",
            "numero_nf": "41104",
            "data_entrega": "20/12/2021",
            "data_venda": "",
            "vendedor": "Jose Flavio Gaudereto Rocha",
            "cpf_vendedor": "57963517615",
            "cor": "CINZA ACO ",
            "status_venda": "Efetuada (E)",
            "tipo_venda": "",
            "segmento": "Automovel",
            "subsegmento": "Seme-Pesado",
            "optin": "Sim"
        }, {method: 'POST', headers: { 'integration-key': '11223344556677' }});

        // Call the event handler
        const result = await requestApiHandler(event);
        // Check the response
        expect(result.statusCode).toBe(201);
        expect(JSON.parse(result.body).message).toBe('Venda integrada com sucesso!');
    });

    // Test 4 - Validate the invalid token
    it('[04] invalid token', async () => {

        injector.unbind(TYPES.DmsService);
        injector.bind(TYPES.DmsService).toConstantValue(createDmsServiceMock(undefined));

        createSQSClientMock();

        // Create a API Gateway
        const event = constructAPIGwEvent({}, {method: 'POST', headers: { 'integration-key': '11223344556677' }});

        // Call the event handler
        const result = await requestApiHandler(event);
        const body = result.body !== '' ? JSON.parse(result.body) : undefined;

        // Check the response
        expect(result.statusCode).toBe(401);
        expect(body.message).toBe('Token inválido');
    });
});
