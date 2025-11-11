const botaoRanking = document.getElementById('btn-iniciar-ranking');
const container = document.getElementById('ranking-container');

if (botaoRanking) {
    botaoRanking.addEventListener('click', async function() {
        try {
            // Busca os dados do endpoint
            const resp = await fetch("http://127.0.0.1:8080/ranking");
            const data = await resp.json();

            // Limpa o container antes de adicionar os novos dados
            container.innerHTML = '';

            // Ordena os arquivos pelo que você quiser, exemplo por "nome"
            data.sort((a, b) => a.nome.localeCompare(b.nome));

            // Cria elementos HTML para mostrar os arquivos
            data.forEach(item => {
                const div = document.createElement('div');
                div.textContent = `${item.nome} - ${item.pontos}`;
                container.appendChild(div);
            });

            // Se quiser abrir o endpoint em outra aba
            // window.open("http://127.0.0.1:8080/ranking", "_blank");

        } catch (error) {
            console.error("Erro ao buscar o ranking:", error);
        }
    });
}
