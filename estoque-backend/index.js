require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// GET /api/epis → Lista todos os EPIs do estoque
app.get('/api/epis', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estoque');
    res.status(200).json(result.rows);
  } catch (error) {
    console.log('Erro ao consultar EPIs:', error);
    res.status(500).json({ error: 'Erro ao buscar EPIs' });
  }
});

// PUT /api/epis/:id → Atualiza a quantidade de um EPI
app.put('/api/epis/:id', async (req, res) => {
  const { id } = req.params;
  const { quantidade } = req.body;

  if (!quantidade || quantidade < 0) {
    return res.status(400).json({ error: 'Quantidade inválida' });
  }

  try {
    const result = await pool.query(
      'UPDATE epi_estoque SET quantidade = $1 WHERE id = $2 RETURNING *',
      [quantidade, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'EPI não encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar EPI' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`API de Estoque rodando em http://localhost:${PORT}`);
});
