const express = require('express');
const cookieParser = require('cookie-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

const users = [
    { name: 'doutor Strank', username: 'OdOUtOrSTRaNK', password: 'russia', isAdmin: true }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/facacadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastro.html'));
});

app.post('/facacadastro', (req, res) => {
    const { name, username, password } = req.body;
    users.push({ name, username, password, isAdmin: false });
    res.cookie('user_id', users.length - 1);
    res.redirect('/perfil');
});

app.get('/perfil', (req, res) => {
    const userId = req.cookies.user_id;
    if (userId !== undefined && users[userId]) {
        const user = users[userId];
        res.send(`<h1>Perfil de ${user.username}</h1><p>Olá ${user.name || user.username}.</p><p>É bom ter você aqui!</p>`);
    } else {
        res.redirect('/login');
    }
});


// Rota para processar o login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        if (user.isAdmin) {
            res.redirect('/dashboard-strank');
        } else {
            res.send('Login bem-sucedido, mas você não é um administrador.');
        }
    } else {
        res.redirect('/login?error=true');
    }
});

app.get('/dashboard-strank', (req, res) => {
    res.send(`
        <h1>Painel do Dr. Strank</h1>
        <p>Verificar status de um serviço:</p>
        <form action="/dashboard-strank/ping" method="post">
            <input type="text" name="address" placeholder="Endereco IP">
            <button type="submit">Pingar</button>
        </form>
    `);
});

app.post('/dashboard-strank/ping', (req, res) => {
    const { address } = req.body;
    exec('ping -c 3 ' + address, (error, stdout, stderr) => {
        if (error) {
            return res.send(`<pre>${error.message}</pre>`);
        }
        if (stderr) {
            return res.send(`<pre>${stderr}</pre>`);
        }
        res.send(`<pre>${stdout}</pre>`);
    });
});

app.listen(80, () => {
    console.log(`[+] Servidor rodando em http://localhost:80/ [+]`);
});
