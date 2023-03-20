import 'reflect-metadata';
import {requestApiHandler} from '../../src/handlers/after-sale/validator';
import {constructAPIGwEvent} from '../utils/helpers';
import {injector} from '../../src/shared/injection/injector';
import {TYPES} from '../../src/shared/injection/types';
import {createSQSClientMock} from "../utils/mocks/sqs-publisher.mock";
import {createDmsServiceMock} from "../utils/mocks/dms-service.mock";
import {AfterSaleService} from "../../src/modules/after-sale/after-sale.service";

// Defines the validate after sale handler suite test
describe('Handler validate after sale', () => {

    // Clear all mocks before execute every test and recreate AfterSaleService in the dependency injector
    beforeEach(() => {
        jest.clearAllMocks();
        // Removes all the existing service instance from injector
        injector.unbindAll();
        injector.bind(TYPES.AfterSaleService).to(AfterSaleService);
        injector.bind(TYPES.DmsService).toConstantValue(createDmsServiceMock(100));
    });

    // Test 1 - Validate the invalid after sale
    it('[01] invalid after sale', async () => {

        // Create a API Gateway
        const event = constructAPIGwEvent({
            "contato": "Teste Indecx.",
            "cep": "89140000",
            "tipo_endereco": "Rua",
            "endereco_completo": "RUA MARQUES DO HERVAL, 1185",
            "numero": "",
            "complemento": "SALA 03",
            "bairro": "PONTO CHIC",
            "cidade": "IBIRAMA",
            "estado": "SC",
            "celular_principal": "A47988579928",
            "telefone1": "AAAAA",
            "telefone2": "A4733573602",
            "telefone3": "A47988579928",
            "chassi": "9BM958434GB026150",
            "modelo": "CAMINHAO-TRATOR AXOR 2041 S/36",
            "ano_fabricacao": "A2015",
            "ano_modelo": "A2016",
            "placa": "QIA-2336",
            "km": "333698",
            "numero_os": "A152100",
            "cit": "5N",
            "valor_pecas": "A120,5",
            "valor_mo": "A190",
            "descricao_servico": "5N - Garantia Caminhoes (MB)",
            "consultor": "Cleiton Fabrício Mohr",
            "data_abertura_os": "13/13/2021",
            "status_os": "Encerrada",
            "data_entrada_portaria": "13/13/2021",
            "data_saida_portaria": "14/13/2021",
            "hr_abertura_os": "14:70",
            "hr_fechamento_os": "09:80",
            "hr_termino_apontamento": "09:80",
            "numero_nf": "A86991",
            "hr_vendidas": "1,9",
            "hr_aplicadas": "1,94",
            "data_primeiro_apontamento": "13/13/2021",
            "hr_inicio_primeiro_apontamento": "16:90",
            "data_termino_apontamento": "13/13/2021",
            "hora_termino_apontamento": "16:88",
            "data_fechamento_os": "14/13/2021",
            "data_faturamento_os": "14/13/2021",
            "hr_faturamento_os": "09:85",
            "segmento": "Caminhões ExtraPesados",
            "subsegmento": ""
        }, {method: 'POST', headers: {'integration-key': '11223344556677'}});

        // Call the event handler
        const result = await requestApiHandler(event);
        const body = result.body !== '' ? JSON.parse(result.body) : undefined;

        // Check the response
        expect(result.statusCode).toBe(412);
        expect(body.filter((e: any) => e.field === 'conta')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'documento')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'cliente')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'celular_principal')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'telefone1')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'telefone2')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'telefone3')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'ano_fabricacao')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'ano_modelo')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'numero_os')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'valor_pecas')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'valor_mo')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_fechamento_os')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_abertura_os')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_entrada_portaria')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_saida_portaria')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'hr_abertura_os')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'hr_fechamento_os')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'numero_nf')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_primeiro_apontamento')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'hr_inicio_primeiro_apontamento')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_termino_apontamento')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'hr_termino_apontamento')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_faturamento_os')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'hr_faturamento_os')).toEqual(expect.any(Object));
    });

    // Test 2 - Validate the invalid sale 2
    it('[02] invalid sale 2', async () => {

        // Create a API Gateway
        const event = constructAPIGwEvent({
            "contato": "Teste Indecx.",
            "cep": "89140000",
            "tipo_endereco": "Rua",
            "endereco_completo": "RUA MARQUES DO HERVAL, 1185",
            "numero": "",
            "complemento": "SALA 03",
            "bairro": "PONTO CHIC",
            "cidade": "IBIRAMA",
            "estado": "SC",
            "email_principal": "clientesememail@test.com",
            "telefone1": "AAAAA",
            "telefone2": "A4733573602",
            "telefone3": "A47988579928",
            "chassi": "9BM958434GB026150",
            "modelo": "CAMINHAO-TRATOR AXOR 2041 S/36",
            "ano_fabricacao": "A2015",
            "ano_modelo": "A2016",
            "placa": "QIA-2336",
            "km": "333698",
            "numero_os": "A152100",
            "cit": "5N",
            "valor_pecas": "A120,5",
            "valor_mo": "A190",
            "descricao_servico": "5N - Garantia Caminhoes (MB)",
            "consultor": "Cleiton Fabrício Mohr",
            "data_abertura_os": "13/13/2021",
            "status_os": "Encerrada",
            "data_entrada_portaria": "13/13/2021",
            "data_saida_portaria": "14/13/2021",
            "hr_abertura_os": "14:70",
            "hr_fechamento_os": "09:80",
            "hr_termino_apontamento": "09:80",
            "numero_nf": "A86991",
            "hr_vendidas": "1,9",
            "hr_aplicadas": "1,94",
            "data_primeiro_apontamento": "13/13/2021",
            "hr_inicio_primeiro_apontamento": "16:90",
            "data_termino_apontamento": "13/13/2021",
            "hora_termino_apontamento": "16:88",
            "data_fechamento_os": "14/13/2021",
            "data_faturamento_os": "14/13/2021",
            "hr_faturamento_os": "09:85",
            "segmento": "Caminhões ExtraPesados",
            "subsegmento": ""
        }, {method: 'POST', headers: {'integration-key': '11223344556677'}});

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
        expect(body.filter((e: any) => e.field === 'numero_os')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'valor_pecas')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'valor_mo')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_fechamento_os')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_abertura_os')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_entrada_portaria')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_saida_portaria')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'hr_abertura_os')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'hr_fechamento_os')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'numero_nf')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_primeiro_apontamento')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'hr_inicio_primeiro_apontamento')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_termino_apontamento')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'hr_termino_apontamento')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'data_faturamento_os')).toEqual(expect.any(Object));
        expect(body.filter((e: any) => e.field === 'hr_faturamento_os')).toEqual(expect.any(Object));
    });

    // Test 3 - Validate the valid after sale
    it('[03] valid after sale', async () => {

        createSQSClientMock();

        // Create a API Gateway
        const event = constructAPIGwEvent({
            "conta": "CCCBBAAA",
            "documento": "35691969000130",
            "cliente": "Teste Indecx.",
            "contato": "Teste Indecx.",
            "cep": "89140000",
            "tipo_endereco": "Rua",
            "endereco_completo": "RUA MARQUES DO HERVAL, 1185",
            "numero": "",
            "complemento": "SALA 03",
            "bairro": "PONTO CHIC",
            "cidade": "IBIRAMA",
            "estado": "SC",
            "celular_principal": "47988579928",
            "telefone1": "",
            "telefone2": "4733573602",
            "telefone3": "47988579928",
            "email_principal": "",
            "chassi": "9BM958434GB026150",
            "modelo": "CAMINHAO-TRATOR AXOR 2041 S/36",
            "ano_fabricacao": "2015",
            "ano_modelo": "2016",
            "placa": "QIA-2336",
            "km": "333698",
            "numero_os": "152100",
            "cit": "5N",
            "valor_pecas": "120,5",
            "valor_mo": "190",
            "descricao_servico": "5N - Garantia Caminhoes (MB)",
            "consultor": "Cleiton Fabrício Mohr",
            "data_abertura_os": "13/04/2021",
            "status_os": "Encerrada",
            "data_entrada_portaria": "13/04/2021",
            "data_saida_portaria": "14/04/2021",
            "hr_abertura_os": "14:58",
            "hr_fechamento_os": "09:10",
            "numero_nf": "86991",
            "hr_vendidas": "1,9",
            "hr_aplicadas": "1,94",
            "data_primeiro_apontamento": "13/04/2021",
            "hr_inicio_primeiro_apontamento": "16:00",
            "data_termino_apontamento": "13/04/2021",
            "hora_termino_apontamento": "16:31",
            "data_fechamento_os": "14/04/2021",
            "data_faturamento_os": "14/04/2021",
            "hr_faturamento_os": "09:10",
            "segmento": "Caminhões ExtraPesados",
            "subsegmento": ""
        }, {method: 'POST', headers: {'integration-key': '11223344556677'}});

        // Call the event handler
        const result = await requestApiHandler(event);
        // Check the response
        expect(result.statusCode).toBe(201);
        expect(JSON.parse(result.body).message).toBe('Serviço integrado com sucesso!');
    });

    // Test 4 - Validate the invalid token
    it('[04] invalid token', async () => {

        injector.unbind(TYPES.DmsService);
        injector.bind(TYPES.DmsService).toConstantValue(createDmsServiceMock(undefined));

        createSQSClientMock();

        // Create a API Gateway
        const event = constructAPIGwEvent({}, {method: 'POST', headers: {'integration-key': '11223344556677'}});

        // Call the event handler
        const result = await requestApiHandler(event);
        const body = result.body !== '' ? JSON.parse(result.body) : undefined;

        // Check the response
        expect(result.statusCode).toBe(401);
        expect(body.message).toBe('Token inválido');
    });
});
