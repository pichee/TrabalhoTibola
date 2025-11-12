  fetch("/ranking").then(async res => {
            const data = await res.json();
            const el = document.createElement("ol");
            for (let rank of data.ranks) {
                const li = document.createElement("li");
                li.textContent = rank.nome + " (" + rank.pontuacao + ")";
                el.appendChild(li);
            }
            document.getElementById("saida").replaceChildren(el);
        })