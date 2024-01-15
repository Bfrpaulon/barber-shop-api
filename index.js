const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const haircutRoutes = require('./routes/haircutRoutes');
const barberRoutes = require('./routes/barberRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/barberShopDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => console.log('Conectado ao MongoDB'));

app.use('/api', haircutRoutes);
app.use('/api', barberRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
