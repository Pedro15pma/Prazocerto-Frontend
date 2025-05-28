const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve arquivos estáticos da pasta "src"
app.use(express.static(path.join(__dirname)));

// Rota padrão (opcional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
