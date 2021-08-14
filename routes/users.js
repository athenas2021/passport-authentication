const express = require('express');
const router = express.Router();

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
        res.send('passou')
    }
});

module.exports = router;