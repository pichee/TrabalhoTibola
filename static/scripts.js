document.addEventListener('DOMContentLoaded', function() {
    const botaoRanking = document.getElementById('btn-iniciar-ranking');

    if (botaoRanking) {
        botaoRanking.addEventListener('click', function() {
            // Abre o HTML do ranking
            window.location.href = '/rank.html'; 
        });
    }
});
