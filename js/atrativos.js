const Information = document.querySelector("#Information");

class Cidade {
    static async listarCidadeId(cidadeId) {
        try {
            const response = await fetch(`https://apidesafio5.onrender.com/atrativos/${cidadeId}`);
            const data = await response.json();
            console.log("Cidades recebidos no front-end:", data); 
            return Array.isArray(data) ? data : [data];
        } catch (error) {
            console.error("Erro ao listar Cidade:", error);
            return [];
        }
    }
}

function displayCidades(cidades) {
    Information.innerHTML = ''; 

    cidades.forEach(cidade => {
        const cidadeElement = document.createElement('div');
        cidadeElement.className = 'cidade';

        cidadeElement.innerHTML = `
            <h3>${cidade.nome || 'Nome não disponível'}</h3>
            <img src="${cidade.img_atrativo}" alt="${cidade.nome_cidade}" />
            <p>${cidade.descricao || 'Descrição não disponível'}</p>
            <button class="buttonFiltro" role="button" data-id="${cidade.id_atrativos}">Venha nos Visitar</button>
        `;
        console.log(cidade.id_atrativos)

        Information.appendChild(cidadeElement);

        // evento de clique 
        cidadeElement.querySelector('.buttonFiltro').addEventListener('click', () => {
            const id = cidade.id_atrativos; 
            console.log("ID do atrativo:", id); 
            window.location.href = `mapa.html?id=${id}`;
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const cidadeId = params.get('cidade');
    console.log("ID da cidade:", cidadeId); 

    if (cidadeId) {
        const cidades = await Cidade.listarCidadeId(cidadeId);
        displayCidades(cidades);
    }
});
 