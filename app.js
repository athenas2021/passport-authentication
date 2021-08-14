const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

//Configurar BD
const db = require('./config/keys').MongoURI;

//Conectar o BD
mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log('MongoDB conectado...'))
.catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Rotas
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Servidor rodando na porta ${PORT}`));