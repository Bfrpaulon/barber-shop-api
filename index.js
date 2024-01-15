require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const haircutRoutes = require('./routes/haircutRoutes');
const barberRoutes = require('./routes/barberRoutes');
const newsletterEmailRoutes = require('./routes/newsletterEmailRoutes');
const contactFormRoutes = require('./routes/contactFormRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => console.log('Conectado ao MongoDB'));

app.use('/api', haircutRoutes);
app.use('/api', barberRoutes);
app.use('/api', newsletterEmailRoutes);
app.use('/api', contactFormRoutes);
app.use('/auth', authRoutes);

// Rota para a documentação HTML
app.get('/documentation', (req, res) => {
  res.sendFile(__dirname + '/documentation.html');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação disponível em http://localhost:${port}/documentation`);
});
