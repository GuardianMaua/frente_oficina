from flask import Flask, send_from_directory, request, jsonify, Response
import os

app = Flask(__name__, static_folder='build', static_url_path='')

# Rota principal para servir o index.html


@app.route('/')
def serve():
    index_path = os.path.join(app.static_folder, 'index.html')
    try:
        # Leia o conteúdo do index.html
        with open(index_path, 'r', encoding='utf-8') as f:
            html_content = f.read()

        # Insira o comentário no HTML (ex.: no início do body)
        html_content = html_content.replace(
            '<body>',
            '<body>\n<!-- Peter, não esqueça de remover suas credenciais do arquivo /creds.txt -->\n'
        )

        # Retorne o HTML modificado
        return Response(html_content, mimetype='text/html')
    except FileNotFoundError:
        return "index.html não encontrado.", 404

# Rota para servir arquivos estáticos (CSS, JS, imagens)


@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

# Rota para validar o login e retornar a flag do CTF


@app.route('/validate', methods=['POST'])
def validate_login():
    try:
        # Ler credenciais do arquivo creds.txt (formato: usuario:senha)
        with open('creds.txt', 'r') as f:
            valid_creds = [line.strip().split(':') for line in f.readlines()]

        # Obter dados do JSON enviado
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        # Verificar se as credenciais estão corretas
        if [username, password] in valid_creds:
            flag = "GUARDIAN{DUMB_D3VS}"
            return jsonify({'success': True, 'message': 'Login bem-sucedido!', 'flag': flag})
        else:
            return jsonify({'success': False, 'message': 'Usuário ou senha incorretos.'})

    except Exception as e:
        return jsonify({'success': False, 'message': f'Erro no servidor: {str(e)}'})

# Rota para servir o conteúdo de creds.txt


@app.route('/creds.txt')
def serve_creds():
    try:
        with open('creds.txt', 'r') as f:
            content = f.read()
        return Response(content, mimetype='text/plain')
    except FileNotFoundError:
        return Response("Arquivo não encontrado.", status=404)


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 80))
    app.run(host='0.0.0.0', port=port, debug=True)
