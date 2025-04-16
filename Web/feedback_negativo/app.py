from flask import Flask, request, render_template_string

app = Flask(__name__)

FLAG = "GUARDIAN{BUFF3R_OVERFL0W}"


@app.route("/", methods=["GET", "POST"])
def index():
    message = "Pesquisa de satisfação SecureTech."
    if request.method == "POST":
        user_input = request.form.get("input_box_user", "")
        if len(user_input) > 80:
            message = f"Parabéns! Aqui está a flag: {FLAG}"
        else:
            message = "Obrigado!"
    return render_template_string("""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    font-family: Arial, sans-serif;
                }
                h1 {
                    margin-bottom: 50px;
                    color: black;
                    font-size: 50px;
                }
                form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1vh;
                    width: 100%;
                }
                input[type="text"] {
                    padding: 10px;
                    font-size: 16px;
                    margin-bottom: 10px;
                    height: 5vh;
                    width: 40%;
                    font-size: 150%;
                }
                input[type="text"]:focus {
                    border: 3px solid #B929BE;
                }
		input[type="password"] {
                    padding: 10px;
                    font-size: 16px;
                    margin-bottom: 10px;
                    height: 5vh;
                    width: 40%;
                    font-size: 150%;
                }
                input[type="password"]:focus {
                    border: 3px solid #B929BE;
                }
                input[type="submit"] {
                    padding: 10px 20px;
                    font-size: 16px;
                    background-color: #B929BE;
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                }
                input[type="submit"]:hover {
                    background-color: #0056b3;
                }
                .message {
                    margin-bottom: 20px;
                    font-size: 18px;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <h1>SecureTech</h1>
            <form method="POST">
                <div class="message">{{ message }}</div>
                <input type="text" id="input_box_user" name="input_box_user" placeholder="Digite a sua opinião">
                <br>
                <input type="submit" value="Enviar">
            </form>
        </body>
        </html>
    """, message=message)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
