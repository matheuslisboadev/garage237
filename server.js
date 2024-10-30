const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importe o CORS
const carroRoutes = require('./src/routes/carro');
const garagemRoutes = require('./src/routes/garagem');
const app = express();

// Middleware para JSON e CORS
app.use(express.json());
app.use(cors()); // Ative o CORS para todas as rotas

// Configurar rotas com o prefixo /api
app.use('/api/carros', carroRoutes);
app.use('/api/garagens', garagemRoutes);

// Conectar ao MongoDB
mongoose.connect('mongodb+srv://suki:s2000@garage237.csyx1.mongodb.net/?retryWrites=true&w=majority&appName=garage237', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
