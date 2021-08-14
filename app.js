const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

//Configurar BD
const db = require('./config/keys').MongoURI;

//Conectar o BD
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado...'))
.catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//BodyParser
app.use(express.urlencoded({extented:false}));
app.use(express.json());

//Express session midleware
app.use(session({
  secret: 'knsecret',
  resave: false,
  saveUninitialized: true
}))

//Connect Flash
app.use(flash());

//Variaveis globais
app.use((req,res,next) => {
    res.locals.success_msg = res.flash('success_msg');
    res.locals.error_msg = res.flash('error_msg');
    next();
});

//Rotas
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Servidor rodando na porta ${PORT}`));