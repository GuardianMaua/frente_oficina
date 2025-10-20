const express = require('express');
const path = require('path');
const app = express();
const port = 80;


const SECOND_FLAG = "GDA{ROBO_NAO_AUTORIZADO}";
const THIRD_FLAG = "GDA{SUPERIORIDADE_VILTRUMITA}";
const FOURTH_FLAG = "GDA{CECIL_SEMPRE_SABE}";
const DECOY_FLAG = "GDA{FALSO_REDIRECIONAMENTO_4B7F}"; //!!!!
const base64Flag = Buffer.from(THIRD_FLAG).toString('base64');
const base64Decoy = Buffer.from(DECOY_FLAG).toString('base64');
const SQLI_PAYLOAD = "' OR '1'='1'--";

//(IDOR)
const USER_2_SECRET_DATA = {
    userId: "USER/2",
    status: "ALERTA VERMELHO",
    acesso: "RESTRITO",
    dadosConfidenciais: "Relatório de Falha da Missão #921. Arquivo GDA-VLT-004.",
    flag: FOURTH_FLAG,
    observacoes: "Estes dados não deveriam estar visíveis para o agente 1."
};

const USER_1_PRIVATE_DATA = {
    userId: "USER/1",
    status: "OK",
    acesso: "AUTORIZADO",
    dadosConfidenciais: "Relatório de Status Padrão. Nenhuma informação por aqui.",
    observacoes: "Há alguns dados expostos."
};

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


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// rota principal login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'desafio-01.html'));
});

// rota processamento do login (Desafio 01)
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    
    if (username && username.trim() === SQLI_PAYLOAD) {
        res.status(200).json({
            success: true,
            redirectUrl: `/flag-01.html`
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Falha no login. Tente novamente!'
        });
    }
});


// Rota de Diagnóstico do Robô - desafio 02
app.get('/desafio-02.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'desafio-02.html'));
});

app.post('/verificar-flag-02', (req, res) => {
    const { flag } = req.body;

    if (!flag) {
        return res.status(400).json({ success: false, message: 'Parâmetro de flag ausente.' });
    }

    if (flag.trim() === SECOND_FLAG) {
        const redirectUrl = `/desafio-03.html?${base64Flag}`;
        res.status(200).json({
            success: true,
            message: 'Flag Correta! Desafio 02 Concluído.',
            redirectUrl: redirectUrl
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Flag Incorreta. Tente Novamente!'
        });
    }
});

//Desafio 03
app.get('/desafio-03.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'desafio-03.html'));
});

app.post('/verificar-flag-03', (req, res) => {
    const { flag } = req.body;

    if (!flag) {
        return res.status(400).json({ success: false, message: 'Parâmetro de flag ausente.' });
    }
    if (flag.trim() === THIRD_FLAG) {
        const redirectUrl = `/desafio-04.html?${base64Decoy}`;
        res.status(200).json({
            success: true,
            message: 'Flag Correta!',
            redirectUrl: redirectUrl
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: 'Flag Incorreta. Tente Novamente!'
        });
    }
});

//desafio 04
app.get('/desafio-04.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'desafio-04.html'));
});

app.get('/dados-privados', (req, res) => {
    const userId = req.query.id;
    
    if (!userId) {
        return res.status(400).json({ 
            error: "Parâmetro 'id' do usuário ausente.",
            exemplo: "Tente acessar: /dados-privados?id=USER_1"
        });
    }

    if (userId === 'USER/1') {
        return res.json(USER_1_PRIVATE_DATA);
    } else if (userId === 'USER/2') {
        return res.json(USER_2_SECRET_DATA);
    } else {
        return res.status(404).json({
            error: `Agente com ID ${userId} não encontrado.`,
            message: 'Verifique se o ID está correto (ex: USER/1, USER/2).'
        });
    }
});

app.post('/verificar-flag-04', (req, res) => {
    const { flag } = req.body;
    
    if (flag && flag.trim() === FOURTH_FLAG) {
        res.status(200).json({
            success: true,
            message: 'Flag Correta!',
            redirectUrl: '/ctf-finalizado.html'
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Flag Incorreta.'
        });
    }
});


// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
