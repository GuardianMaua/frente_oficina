// server.js

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 80;

// --- FUNÇÕES DE GERAÇÃO DE FLAG E TEMPLATE ---

/**
 * Cria a flag no formato: flag{nnnn-nn-nnnnn-nnn}
 */
function createRandomFlag() {
    const generateRandomNumberString = (length) => {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10).toString();
        }
        return result;
    };
    const part1 = generateRandomNumberString(4);
    const part2 = generateRandomNumberString(2);
    const part3 = generateRandomNumberString(5);
    const part4 = generateRandomNumberString(3);
    
    return `flag{${part1}-${part2}-${part3}-${part4}}`;
}

/**
 * Lê o template HTML do disco e injeta os valores dinâmicos (placeholders).
 */
function renderTemplate(templateName, replacements) {
    const templatePath = path.join(__dirname, 'views', templateName);
    try {
        let html = fs.readFileSync(templatePath, 'utf8');
        
        // Substitui placeholders no template
        for (const key in replacements) {
            const regex = new RegExp(key, 'g'); 
            html = html.replace(regex, replacements[key]);
        }
        return html;
    } catch (error) {
        console.error(`Erro ao ler template ${templateName}:`, error);
        return '<h1>Erro interno do servidor ao carregar a página.</h1>';
    }
}


// --- Configuração e Midllewares ---
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Permite que o navegador acesse arquivos estáticos (CSS, Landpage) da pasta /public
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(path.join(__dirname, 'views'))); 

// --- Credenciais do CTF ---
// O par de credenciais que o atacante deve encontrar na wordlist
const SENHA_SECRETA_REAL = 'Comander';
const CREDENCIAIS_CORRETAS = { usuario: 'fizz', senha: SENHA_SECRETA_REAL }; 
// O cookie que concede privilégio admin (o atacante deve descobrir)
const ADMIN_COOKIE_NAME = 'admin_session';
const ADMIN_COOKIE_VALUE = 'true';


// =====================================================================
// === FASE 1: FORÇA BRUTA E ENUMERAÇÃO ===
// =====================================================================

// Landpage (Hotel - Fachada)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// PÁGINA OCULTA DE ENUMERAÇÃO (AGORA: /lixeira)
app.get('/lixeira', (req, res) => {
    // Renderiza a página simples que contém o link para o download
    const dumpPage = renderTemplate('dump.html', {});
    res.send(dumpPage);
});

// PÁGINA OCULTA DE DOWNLOAD REAL (AGORA: /arquivos/backup_secreto)
app.get('/arquivos/backup_secreto', (req, res) => {
    // Nome do arquivo físico no disco
    const internalFilename = 'wordlist.txt';
    const filePath = path.join(__dirname, 'assets', internalFilename);
    
    // Nome do arquivo que o usuário verá no download
    const downloadFilename = 'logs_criptografados_2022.txt';

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Erro ao ler o arquivo: ${err}`);
            return res.status(500).send('Erro interno do servidor ao acessar o arquivo.');
        }

        // Força o download com o nome de exibição mais atraente
        res.setHeader('Content-Disposition', `attachment; filename="${downloadFilename}"`); 
        res.setHeader('Content-Type', 'text/plain'); 
        
        res.send(data);
    });
});

// PÁGINA OCULTA DE LOGIN
app.get('/painel_de_acesso', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Endpoint para processar o LOGIN
app.post('/painel_de_acesso', (req, res) => {
    const { username, password } = req.body;

    if (username === CREDENCIAIS_CORRETAS.usuario && password === CREDENCIAIS_CORRETAS.senha) {
        // Login bem-sucedido
        res.cookie('auth_user', username, { httpOnly: true, maxAge: 900000 });
        res.cookie('auth', 'authenticated', { httpOnly: true, maxAge: 900000 });
        
        console.log(`[SUCESSO] Login de: ${username}`);
        res.redirect('/home');
    } else {
        console.log(`[FALHA] Tentativa de login: ${username} | ${password}`);
        res.send('Login falhou. Credenciais não reconhecidas na Ordem de Nexus. <a href="/painel_de_acesso">Voltar</a>');
    }
});


// =====================================================================
// === FASE 2: ACESSO À FLAG 1 E PISTA DO BURP ===
// =====================================================================
app.get('/home', (req, res) => {
    const userId = req.cookies.auth_user;
    
    // Verifica se o usuário está autenticado
    if (req.cookies.auth === 'authenticated' && userId) {


        // Renderiza o template de home, injetando a flag e o nome de usuário
        const homePageContent = renderTemplate('home.html', {
            '$FLAG_PLACEHOLDER': flag1,
            '$USER_PLACEHOLDER': userId
        });
        
        res.send(homePageContent);
    } else {
        res.status(401).send('Acesso negado. Por favor, faça login em <a href="/painel_de_acesso">/painel_de_acesso</a>.');
    }
});


// =====================================================================
// === FASE 3: MANIPULAÇÃO DE COOKIE E FLAG 2 ===
// =====================================================================
app.get('/home/admin', (req, res) => {
    // Pega o valor do cookie 'admin_session'
    const adminCookie = req.cookies[ADMIN_COOKIE_NAME]; 

    // Se o cookie for encontrado E o valor for 'true', concede acesso
    if (adminCookie === ADMIN_COOKIE_VALUE) { 
        const flag2 = createRandomFlag();
        console.log(`Segunda FLag: ${flag2}`);
        
        // Renderiza o template de admin
        const adminPageContent = renderTemplate('admin.html', {
            '$FLAG_PLACEHOLDER': flag2
        });
        
        res.send(adminPageContent);
    } else {
        // RESPOSTA DE ACESSO NEGADO QUE CONTÉM A PISTA PARA O BURP
        res.status(403).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Acesso Negado</title>
                <link rel="stylesheet" href="/style-darknet.css">
            </head>
            <body class="dn-container" style="text-align: center;">
                <h1>[ACESSO NEGADO: CÓDIGO 403]</h1>
                <p style="color: red;">Privilégios insuficientes. Você precisa de um token de autorização de Nível 0.</p>
                <p>O sistema verifica uma variável de sessão de privilégio. <strong>Se o seu valor for '${ADMIN_COOKIE_VALUE}', a passagem é liberada.</strong></p>
                <p style="margin-top: 30px;"><a href="/home">Voltar ao Mercado</a></p>
                <p style="color: gray; margin-top: 50px;">Trace: [VARIAVEL_DE_ADMIN_CHECK: FAILED]</p>
            </body>
            </html>
        `);
    }
});

// Logout
app.get('/logout', (req, res) => {
    // Limpa todos os cookies de sessão
    res.clearCookie('auth');
    res.clearCookie('auth_user');
    res.clearCookie(ADMIN_COOKIE_NAME); 
    res.send('Você foi desconectado do Grupo Secreto. <a href="/">Voltar para a Fachada do Hotel</a>');
});


// 404 para rotas não encontradas
app.use((req, res) => {
    res.status(404).send("Página não encontrada.");
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`\n======================================================`);
    console.log(`CTF WEB Challenge rodando em http://localhost:${port}`);
    console.log(`Rotas Ocultas: /wordlist_secreta e /painel_de_acesso`);
    console.log(`Credenciais de Login (Força Bruta): ${CREDENCIAIS_CORRETAS.usuario} / (Senha na wordlist!)`);
    console.log(`Cookie de Admin (Exploração): ${ADMIN_COOKIE_NAME} = ${ADMIN_COOKIE_VALUE}`);
    console.log(`======================================================\n`);
});