const Information = document.querySelector("#Information");

class Atrativos {
    static async listarAtrativosPorRegiao(idRegiao) {
        try {
            const response = await fetch(`https://apidesafio5.onrender.com/atrativos/${idRegiao}`);
            const data = await response.json();
            console.log("Atrativos recebidos no front-end:", data);
            return Array.isArray(data) ? data : [data];
        } catch (error) {
            console.error("Erro ao listar atrativos por região:", error);
            return [];
        }
    }
}

function displayAtrativos(atrativos) {
    Information.innerHTML = '';

    atrativos.forEach(atrativo => {
        const atrativoElement = document.createElement('div');
        atrativoElement.className = 'atrativo';

        console.log("Processando atrativo:", atrativo);

        atrativoElement.innerHTML = `
            <h3>${atrativo.nome || 'Nome não disponível'}</h3>
            <img src="${atrativo.img_atrativo}" alt="${atrativo.nome}" />
            <p>${atrativo.descricao || 'Descrição não disponível'}</p>
            <button class="buttonFiltro" role="button" onclick="window.location.href='index.html'">venha conhecer</button>
        `;
        
        Information.appendChild(atrativoElement);

        atrativoElement.querySelector('.buttonFiltro').addEventListener('click', () => {
            const id = atrativo.id_atrativos; 
            console.log("ID do atrativo:", id); 
            window.location.href = `mapa.html?id=${id}`;
        });
    });

}

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const regiaoId = params.get('regiao');
    console.log("ID da região:", regiaoId);

    if (regiaoId) {
        const atrativos = await Atrativos.listarAtrativosPorRegiao(regiaoId);
        displayAtrativos(atrativos);
    }
});
