from flask import Flask, render_template, request
import os


app = Flask(__name__)

# Página inicial


@app.route('/')
def index():
    return '''
<!-- A senha deve estar por aqui, procure! -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Desafio CTF - Login</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #141e30, #243b55);
            color: #fff;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .login-container {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 20px 40px;
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
            text-align: center;
            width: 350px;
        }

        .login-container h1 {
            font-size: 2rem;
            margin-bottom: 20px;
            color: #f39c12;
        }

        .login-container p {
            margin-bottom: 15px;
            color: #fff; 
            font-weight: bold;
        }

        .login-container .hint {
            color: red; 
        }

        .login-container form {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .login-container label {
            text-align: left;
        }

        .login-container input {
            padding: 10px;
            border: none;
            border-radius: 5px;
            background: #fff;
            color: #333;
        }

        .login-container input:focus {
            outline: none;
            box-shadow: 0 0 5px #f39c12;
        }

        .login-container button {
            padding: 10px;
            border: none;
            border-radius: 5px;
            background: #f39c12;
            color: #fff;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.3s;
        }

        .login-container button:hover {
            background: #e67e22;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h1>Desafio CTF - PRINT</h1>
        <p>Descubra a senha correta para acessar a flag.</p>
        <form method="post" action="/check">
            <label for="username">Login:</label>
            <input type="text" id="username" name="username" value="print2025" readonly>
            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" placeholder="Digite a senha">
            <button type="submit">Enviar</button>
        </form>
    </div>

    <!-- A senha correta é "facinho123" -->
</body>
</html>
    '''


@app.route('/check', methods=['POST'])
def check_password():
    user_input = request.form['password']
    correct_password = "facinho123"  # <-- senha aqui
    if user_input == correct_password:
        return "Parabéns! A flag é GUARDIAN{1T_W4S_3ASY}"
    else:
        return "Senha incorreta! Volte e tente novamente."


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 80))
    app.run(host='0.0.0.0', port=port, debug=True)
