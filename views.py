from main import app
from flask import Flask,render_template,jsonify
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/ranking")
def ranking():
    dados_jogadores = []

    with open("rank.csv","r") as arquivo:
        next(arquivo)
        for linha in arquivo:
            linha_limpa = linha.strip()
            if linha_limpa != None:  
                nome, pontuacao = linha_limpa.split(',')
                dados_jogadores.append({
                    "nome": nome,
                    "pontuacao": int(pontuacao)
                    })

    return jsonify({"ranks": dados_jogadores})

@app.route("/rank")
def rank():
    return render_template("rank.html")