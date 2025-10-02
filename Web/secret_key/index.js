/*
Criação de API completa com JavaScript + Express
*/

const express = require('express');
const path = require('path');
const app = express();
const port = 80;

//flags
const firstFlag = "flag_sql_indection_bypass_admin";
const secondFlag = "flag_decoded_base64";
const base64Flag = Buffer.from(secondFlag).toString('base64') //utilizado para codificar a flag

//gera string aleatória
function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function generateFakeBase64() {
    const fakeText = 'ContinueProcurando' + Math.random().toString(28).substring(2);
    return Buffer.from(fakeText).toString('base64');
}

//processa dados de formulário
app.use(express.urlencoded({extended: true}));
app.use(express.json()); //servidor entende e processa reqs em formato JSON
app.use(express.static(path.join(__dirname, 'public')));

//ROTAS DO CTF
//rota principal login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

//rota processamento do login
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    
    //payload
    if (username === "' OR '1'='1'--") {
       res.status(200).json({ success: true, redirectUrl: `/flag.html?flag=${firstFlag}` });
    } else {
        res.status(401).json({ success: false, message: 'Falha no login. Tente novamente.' });
    }
});

//rota meus dados
app.get('/meus-dados', (req, res) => {
    res.redirect(`/meus-dados.html?info=${base64Flag}`);
});

//rota alterar dados
app.get('/alterar-dados', (req, res) => {
    const randomId = generateRandomString(30);
    res.redirect(`/alterar-dados.html?info=${randomId}`);
});

//rota configurações
app.get('/configuracoes', (req, res) => {
    const fakeBase64 = generateFakeBase64();
    res.redirect(`/configuracoes.html?info=${fakeBase64}`);
});

//inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});