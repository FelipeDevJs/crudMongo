const mongoose = require('mongoose');
require('dotenv').config();

if (!process.env.DB_URL) {
  console.error('A variável de ambiente DB_URL não está definida.');
  process.exit(1);
}

mongoose.set('strictQuery', false);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DB_URL, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão:'));
db.once('open', () => {
  console.log('Conexão bem-sucedida!');
});
