import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import movies from './movies.js';  // Importa o movies.js

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 80;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API - lista todos os filmes
app.get('/api/movies', (req, res) => {
  res.json(movies); // Retorna a lista de filmes importada
});

// API - busca por ID
app.get('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (id === 0) {
    return res.json({
      title: "Parabéns! Você encontrou a flag!",
      year: 0o0000,
      description: `A flag é: GUARDIAN{JU5T_TH3_B3G1NN1NG}`,
    });
  }

  const movie = movies.find(m => m.id === id);
  if (movie) res.json(movie);
  else res.status(404).json({ error: 'Filme não encontrado' });
});


// Rota fallback (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
