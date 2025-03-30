const axios = require('axios');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = 'UNIFOR_SECRET_KEY';

app.use(express.json());

function autenticarToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Acesso negado, token não fornecido' });

    jwt.verify(token.replace('Bearer ', ''), SECRET_KEY, (err, usuario) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.usuario = usuario;
        next();
    });
}

async function consultarEstoque() {
    try {
        const urlEstoque = 'http://localhost:3000/estoque';
        const response = await axios.get(urlEstoque);
        return response.data;
    } catch (error) {
        console.error('Erro ao consultar estoque:', error);
        throw new Error('Erro ao consultar estoque');
    }
}

async function consultarPedidosEstoque(req, res) {
    try {
        const estoque = await consultarEstoque();
        res.status(200).json(estoque);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function enviarPedidoParaEstoque(pedido) {
    try {
        const urlEstoquePedidos = 'http://localhost:3000/estoque/pedidos';
        const response = await axios.post(urlEstoquePedidos, pedido);
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar pedido para estoque:', error);
        throw new Error('Erro ao enviar pedido para estoque');
    }
}

async function criarPedido(req, res) {
    try {
        const pedido = req.body;
        const response = await enviarPedidoParaEstoque(pedido);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

app.get('/pedidos/estoque', autenticarToken, consultarPedidosEstoque);
app.post('/pedidos', autenticarToken, criarPedido);

app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    // usuario e senha para conseguir gerar o token
    if (usuario === 'admin' && senha === '1234') {
        const token = jwt.sign({ usuario }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ message: 'Credenciais inválidas' });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
