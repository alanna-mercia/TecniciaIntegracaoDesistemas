const request = require('supertest');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const app = require('../pedidos-backend/index'); // substitua pelo caminho correto

const SECRET_KEY = 'UNIFOR_SECRET_KEY';
let mockAxios;

describe('Teste de pedidos-backend ', () => {
    beforeAll(() => {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.reset();
        jest.clearAllMocks();
    });

    describe('Autenticação', () => {
        test('POST /login - deve retornar token com credenciais válidas', async () => {
            const response = await request(app)
                .post('/login')
                .send({ usuario: 'admin', senha: '1234' });

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('token');

            const decoded = jwt.verify(response.body.token, SECRET_KEY);
            expect(decoded.usuario).toBe('admin');
        });

        test('POST /login - deve retornar 401 com credenciais inválidas', async () => {
            const response = await request(app)
                .post('/login')
                .send({ usuario: 'usuarioErrado', senha: 'senhaErrado' });

            expect(response.statusCode).toBe(401);
            expect(response.body).toEqual({ message: 'Credenciais inválidas' });
        });
    });

    describe('Consultas ao Estoque', () => {
        test('GET /pedidos/estoque - deve retornar dados do estoque', async () => {
            const token = jwt.sign({ usuario: 'test' }, SECRET_KEY);
            const mockEstoque = { items: [{ id: 1, nome: 'Produto A', quantidade: 10 }] };

            mockAxios.onGet('http://localhost:3000/estoque').reply(200, mockEstoque);

            const response = await request(app)
                .get('/pedidos/estoque')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockEstoque);
        });

        test('GET /pedidos/estoque - deve lidar com erro na consulta ao estoque', async () => {
            const token = jwt.sign({ usuario: 'test' }, SECRET_KEY);

            mockAxios.onGet('http://localhost:3000/estoque').reply(500);

            const response = await request(app)
                .get('/pedidos/estoque')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual({ message: 'Erro ao consultar estoque' });
        });
    });

    describe('Criação de Pedidos', () => {
        test('POST /pedidos - deve criar um novo pedido', async () => {
            const token = jwt.sign({ usuario: 'test' }, SECRET_KEY);
            const mockPedido = { produtoId: 1, quantidade: 5 };

            mockAxios.onPost('http://localhost:3000/estoque/pedidos').reply(200, mockPedido);

            const response = await request(app)
                .post('/pedidos')
                .set('Authorization', `Bearer ${token}`)
                .send(mockPedido);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(mockPedido);
        });

    });
});