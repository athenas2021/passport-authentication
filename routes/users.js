const express = require('express');
const router = express.Router();

//Pagina login
router.get('/login', (req,res) => res.render('login'));


//Pagina registro
router.get('/register', (req,res) => res.render('register'));

module.exports = router;