async function Palavra() {
    try {
    const response = await fetch("/sortear_palavra");
    if (!response.ok){
        throw new Error (`Falha no Servidor Status ${response.status}`);
    }
    const data = await response.json();
    
    const palavraSecreta = data.palavra;
    
    return palavraSecreta;}

    catch(error){
        console.error("Algo deu errado");
        const palavras = ["elefante", "computar", "pessoal", "animales", "hospital", "treinado", "aventura", "caminhar"];
        const palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
        return palavraSecreta

    }
}

(async () =>{
    palavraSecreta = await Palavra();
    palavraSecreta = await palavraSecreta.toUpperCase()
})();

function atualizarDisplay() {
    palavraDisplay.textContent = progresso.join(" ");
  }

function levarDados(erros,tempo){
        const pontuacao = Math.max(0, Math.floor(1000 - erros * 10 - tempo * 3));
        const nomeJogador = prompt("Digite seu nome para o ranking:");
        if (nomeJogador) {
            fetch("/salvar_ranking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: nomeJogador, pontuacao: pontuacao })})
            .then(resp => resp.json())
            .then(data => {
            console.log("Ranking atualizado:", data);
            alert("Sua pontuação foi salva!");
            window.location.href = "/"; 
        })
    .catch(err => console.error("Erro ao salvar ranking:", err));

}}

function iniciarCronometro() {
  const display = document.getElementById("tempo");

  intervalo = setInterval(() => {
    segundos++;
    display.textContent = `Tempo: ${segundos}`;
  }, 1000);
}
let palavraSecreta = "";
let erros = 0;
let segundos = 0;
let intervalo;
let progresso = Array(8).fill("_");
const letraSelect = document.getElementById("letra");
const posicaoSelect = document.getElementById("posicao");
const mensagem = document.getElementById("mensagem");
const palavraDisplay = document.getElementById("palavra");

for (let i = 65; i <= 90; i++) {
    const opt = document.createElement("option");
    opt.value = String.fromCharCode(i);
    opt.textContent = String.fromCharCode(i);
    letraSelect.appendChild(opt);
  }

for (let i = 1; i <= 8; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    posicaoSelect.appendChild(opt);
  }


  document.getElementById("tentar").addEventListener("click", () => {
    const letra = letraSelect.value;
    const pos = parseInt(posicaoSelect.value) - 1;

    if (!letra || isNaN(pos)) {
      mensagem.textContent = "Escolha uma letra e uma posição!";
      return;
    }

    if (progresso[pos] !== "_") {
      mensagem.textContent = "Essa posição já foi preenchida!";
      return;
    }

    if (palavraSecreta[pos] === letra) {
      progresso[pos] = letra;
      mensagem.textContent = " Acertou a letra!";
    } else {
      mensagem.textContent = " Errou, tente outra!";
      erros = erros + 1
    }

    atualizarDisplay();

    if (!progresso.includes("_")) {
        mensagem.textContent = "🎉 Parabéns! Você descobriu a palavra: " + palavraSecreta;
        levarDados(erros,segundos);
        
  }
}
    );

  document.getElementById("chutar").addEventListener("click", () => {
    const chute = document.getElementById("chute").value.toUpperCase();
    if (chute === palavraSecreta) {
      progresso = palavraSecreta.split("");
      atualizarDisplay();
      mensagem.textContent = "🎉 Acertou a palavra inteira!";
      levarDados(erros,segundos);
    } 
    else{
      mensagem.textContent = "😞 Palavra errada! Tente novamente.";
      erros = erros + 2;
    }});

  atualizarDisplay();





document.addEventListener("DOMContentLoaded", () => {
  iniciarCronometro();
});