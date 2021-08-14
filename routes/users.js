const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//User Model
const User = require('../models/User');

//Pagina login
router.get('/login', (req, res) => res.render('login'));


//Pagina registro
router.get('/register', (req, res) => res.render('register'));

// Registrador
router.post('/register',(req,res) => {
    const {name,email,password, password2} = req.body;
    let errors = [];

    //checar campos obrigatorios
    if(!name || !email || !password || !password2 ){
        errors.push({msg: 'Favor preencher todos os campos'});
    }

    //Checar se as senhas sao iguais
    if(password !== password2){
        errors.push({msg:'As senhas nao sao iguais'});
    }

    //Checar tamanho
    if(password.length < 6){
        errors.push({msg:'A senha deve conter no minimo 6 caracteres'});
    }

    if (errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        User.findOne({ email: email })
        .then(user => {
            if(user){
                //Se usuario existe
                errors.push({msg: 'Email já em uso'});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
                //Hash senha
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (error, hash) => {
                    if (err) throw err;
                    
                    //password para hash
                    newUser.passowrd = hash;

                    //salvar usuario
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg','Voce esta registrado!')
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));

                }))
            }
        });
    }
});

module.exports = router;