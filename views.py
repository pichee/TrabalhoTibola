from main import app
from flask import Flask,render_template,jsonify,request
import random,csv,os
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

@app.route("/sortear_palavra")
def sortear_palavra():
        with open("palavras.csv", "r", encoding="utf-8") as f:
            palavras = [linha.strip() for linha in f]

        if palavras:
            palavra_sorteada = random.choice(palavras)
            return jsonify({"palavra": palavra_sorteada})

@app.route("/jogar")   
def jogar():
    return render_template("jogar.html")

@app.route("/salvar_ranking", methods=["POST"])
def salvar_ranking():
    try:
        dados = request.get_json()
        print("📦 Dados recebidos do front-end:", dados)

        dados = request.get_json()
        nome = dados.get("nome")
        pontuacao = int(dados.get("pontuacao", 0))

        ranks = []
        # Lê o CSV atual se existir
        if os.path.exists("rank.csv"):
            with open("rank.csv", "r") as f:
                reader = csv.reader(f)
                next(reader, None)  # pula cabeçalho
                for row in reader:
                    ranks.append({"nome": row[0], "pontuacao": int(row[1])})

        # Adiciona o novo jogador
        ranks.append({"nome": nome, "pontuacao": pontuacao})

        # Ordena do maior para o menor
        ranks.sort(key=lambda x: x["pontuacao"], reverse=True)

        # Salva todos de volta no CSV
        with open("rank.csv", "w", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(["nome", "pontuacao"])  # cabeçalho
            for r in ranks:
                writer.writerow([r["nome"], r["pontuacao"]])

        return jsonify({"status": "ok", "ranks": ranks})

    except Exception as e:
        return jsonify({"status": "erro", "mensagem": str(e)})
    except Exception as e:
        print("ERRO NO SALVAR_RANKING:", e)
        return jsonify({"status": "erro", "detalhe": str(e)}), 500